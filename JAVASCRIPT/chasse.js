const element = document.getElementById("moving-element");

// Liste des images disponibles
const images = [
  "../RESSOURCES/logo_ascii.png", // Remplace par l'URL ou le chemin de ta première image
  "../RESSOURCES/logo_lyreco.png"  // Remplace par l'URL ou le chemin de ta seconde image
];

// Liste des positions prédéfinies (angles et bords)
const predefinedPositions = [
  { x: 0, y: 0 }, // Haut-gauche
  { x: window.innerWidth - 50, y: 0 }, // Haut-droit
  { x: 0, y: window.innerHeight - 50 }, // Bas-gauche
  { x: window.innerWidth - 50, y: window.innerHeight - 50 }, // Bas-droit
  { x: (window.innerWidth - 50) / 2, y: 0 }, // Milieu-haut
  { x: (window.innerWidth - 50) / 2, y: window.innerHeight - 50 }, // Milieu-bas
  { x: 0, y: (window.innerHeight - 50) / 2 }, // Milieu-gauche
  { x: window.innerWidth - 50, y: (window.innerHeight - 50) / 2 }, // Milieu-droit
];

// Fonction pour choisir une image aléatoirement
function chooseRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

// Fonction pour choisir une position aléatoire parmi les prédéfinies
function getRandomPosition() {
  return predefinedPositions[Math.floor(Math.random() * predefinedPositions.length)];
}

// Fonction pour initialiser une image et une position aléatoire
function randomizeElement() {
  // Changer l'image
  const randomImage = chooseRandomImage();
  element.style.backgroundImage = `url(${randomImage})`;

  // Changer la position
  const { x, y } = getRandomPosition();
  element.style.transform = `translate(${x}px, ${y}px)`;
}

// Initialiser l'élément au chargement de la page
window.addEventListener("DOMContentLoaded", randomizeElement);

// Changer l'image et la position lors des actions utilisateur
window.addEventListener("click", randomizeElement);
window.addEventListener("scroll", randomizeElement);

// Mettre à jour les positions si la fenêtre est redimensionnée
window.addEventListener("resize", () => {
  predefinedPositions[1].x = window.innerWidth - 50;
  predefinedPositions[2].y = window.innerHeight - 50;
  predefinedPositions[3].x = window.innerWidth - 50;
  predefinedPositions[3].y = window.innerHeight - 50;
  predefinedPositions[4].x = (window.innerWidth - 50) / 2;
  predefinedPositions[5].x = (window.innerWidth - 50) / 2;
  predefinedPositions[6].y = (window.innerHeight - 50) / 2;
  predefinedPositions[7].x = window.innerWidth - 50;
  predefinedPositions[7].y = (window.innerHeight - 50) / 2;
});

const canvas = document.getElementById("fireworks-canvas");
const ctx = canvas.getContext("2d");

// Ajuster la taille du canevas à la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fonction pour créer un feu d'artifice
function createFirework(x, y) {
  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: x,
      y: y,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 5 + 2,
      radius: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      alpha: 1
    });
  }
  return particles;
}

let fireworks = [];

// Fonction pour dessiner les feux d'artifice
function drawFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    firework.forEach(particle => {
      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed;
      particle.alpha -= 0.02;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
      ctx.fill();
    });

    // Supprimer les particules qui ont disparu
    fireworks[index] = firework.filter(particle => particle.alpha > 0);
  });

  fireworks = fireworks.filter(firework => firework.length > 0);

  requestAnimationFrame(drawFireworks);
}

// Ajouter des feux d'artifice à une position spécifique
function triggerFirework(x, y) {
  fireworks.push(createFirework(x, y));
}

// Ajuster la taille du canevas au redimensionnement de la fenêtre
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Démarrer l'animation des feux d'artifice
drawFireworks();

// Ajouter un événement de clic sur l'image
element.addEventListener("click", (event) => {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2; // Position X du centre de l'image
  const y = rect.top + rect.height / 2; // Position Y du centre de l'image
  triggerFirework(x, y);
});


