"use strict";
const images = [
    "../MEDIA/g1.jpg",
    "../MEDIA/g2.jpg",
    "../MEDIA/g3.jpg"
];
const mainImage = document.getElementById("carousel-image");
if (!mainImage) {
    throw new Error("Elementul carusel nu a fost găsit!");
}
let currentIndex = 0;
// Setăm prima imagine
mainImage.src = images[currentIndex];
// ANIMAȚIE 1 (TypeScript): Schimbare imagine cu zoom, opacitate și rotire
function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    // 1. Schimbăm stilurile pentru a începe animația de ieșire
    mainImage.style.transition = "transform 0.4s ease, opacity 0.4s ease";
    mainImage.style.opacity = "0";
    mainImage.style.transform = "scale(0.8) rotate(-5deg)";
    setTimeout(() => {
        // 2. Schimbăm sursa imaginii când este invizibilă
        mainImage.src = images[currentIndex];
        // 3. Aplicăm animația de intrare (Zoom in + revenire la poziție)
        mainImage.style.opacity = "1";
        mainImage.style.transform = "scale(1) rotate(0deg)";
    }, 400);
}
// Schimbare automată la 3 secunde
setInterval(showNextImage, 3000);
// ANIMAȚIE 2 (TypeScript): Animație continuă de plutire (Floating/Pulse) pentru container
const container = document.querySelector(".carousel-view");
if (container) {
    let angle = 0;
    function animateFloatingContainer() {
        angle += 0.03;
        // Calculează o deplasare ușoară pe verticală sus-jos
        const offsetY = Math.sin(angle) * 8;
        container.style.transform = `translateY(${offsetY}px)`;
        requestAnimationFrame(animateFloatingContainer);
    }
    animateFloatingContainer();
}
