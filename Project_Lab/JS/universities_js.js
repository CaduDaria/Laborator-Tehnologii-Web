const API_URL =
   "https://universities.hipolabs.com/search?country=Romania";

const status = document.getElementById("status");
const tbody = document.getElementById("tbody");
const qInput = document.getElementById("q");
const exportBtn = document.getElementById("exportBtn");

let all = [];
let filteredData = [];

function setStatus(text) {
    status.textContent = text;
}


function render(data) {
    tbody.replaceChildren();

    data.forEach(university => {
        const tr = document.createElement("tr");

        const nameTd = document.createElement("td");
        nameTd.textContent = university.name || "";

        const countryTd = document.createElement("td");
        countryTd.textContent = university.country || "";

        const siteTd = document.createElement("td");
        const site = university.web_pages?.[0];

        if (site) {
            const link = document.createElement("a");
            link.href = site;
            link.textContent = site;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            siteTd.appendChild(link);
        }

        tr.append(nameTd, countryTd, siteTd);
        tbody.appendChild(tr);
    });
}

async function loadUniversities() {
    setStatus("Se încarcă universitățile...");
    tbody.replaceChildren();

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Eroare HTTP: " + response.status);
        }

        const data = await response.json();

        all = data;
        filteredData = all;

        render(filteredData);

        setStatus(
            `Încărcat cu succes (${all.length} rezultate).`
        );
    } catch (error) {
        console.error("Eroare la încărcare:", error);

        setStatus(
            "Eroare la încărcare. Verifică internetul și încearcă din nou."
        );
    }
}


qInput.addEventListener("input", () => {
    const q = qInput.value.trim().toLowerCase();

    filteredData = q
        ? all.filter(university =>
            (university.name || "")
                .toLowerCase()
                .includes(q)
        )
        : all;

    render(filteredData);

    setStatus(
        `Filtrate: ${filteredData.length} din ${all.length} rezultate.`
    );
});

function exportCSV(data) {
    if (!data.length) {
        alert("Nu există date de exportat.");
        return;
    }

    const header = ["Nume", "Țara", "Site"];

    const rows = data.map(university => [
        university.name || "",
        university.country || "",
        university.web_pages?.[0] || ""
    ]);

    const escapeCSV = value =>
        `"${String(value).replace(/"/g, '""')}"`;

    
    const csvContent =
        "\uFEFF" +
        [header, ...rows]
            .map(row => row.map(escapeCSV).join(","))
            .join("\r\n");

    const blob = new Blob(
        [csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "universitati_romania.csv";

    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

exportBtn.addEventListener("click", () => {
    exportCSV(filteredData);
});

loadUniversities();
