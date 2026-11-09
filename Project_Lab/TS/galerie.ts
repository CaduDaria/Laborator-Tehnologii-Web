const images: string[] = [
  "../MEDIA/g1.jpg",
  "../MEDIA/g2.jpg",
  "../MEDIA/g3.jpg"
];

const mainImage = document.getElementById("carousel-image") as HTMLImageElement;

if (!mainImage) {
  throw new Error("Elementul carusel nu a fost găsit!");
}

let currentIndex: number = 0;


mainImage.src = images[currentIndex]!;


function showNextImage(): void {
  currentIndex = (currentIndex + 1) % images.length;
  
  mainImage.style.transition = "transform 0.4s ease, opacity 0.4s ease";
  mainImage.style.opacity = "0";
  mainImage.style.transform = "scale(0.8) rotate(-5deg)";

  setTimeout(() => {
    mainImage.src = images[currentIndex]!;

    mainImage.style.opacity = "1";
    mainImage.style.transform = "scale(1) rotate(0deg)";
  }, 400);
}

setInterval(showNextImage, 3000);

const container = document.querySelector(".carousel-view") as HTMLElement | null;
if (container) {
  let angle = 0;
  function animateFloatingContainer(): void {
    angle += 0.03;
    const offsetY = Math.sin(angle) * 8; 
    container!.style.transform = `translateY(${offsetY}px)`;
    requestAnimationFrame(animateFloatingContainer);
  }
  animateFloatingContainer();
}
