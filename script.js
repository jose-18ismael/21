// Configuración del Fondo de Galaxia de Partículas
const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Partículas con tonos que cambian lentamente entre dorado, rosa y azul.
const particles = [];
const numParticles = 250;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: (Math.random() - 0.5) * width * 1.5,
    y: (Math.random() - 0.5) * height * 1.5,
    radius: Math.random() * 2 + 0.5,
    angle: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.002 + 0.0005,
    distance: Math.random() * (Math.min(width, height) / 2) + 50,
    hueOffset: Math.random() * 70 - 35,
    alpha: Math.random() * 0.8 + 0.2
  });
}

function animateGalaxy() {
  const colorShift = (performance.now() * 0.015) % 360;
  ctx.fillStyle = 'rgba(3, 4, 13, 0.2)';
  ctx.fillRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;

  particles.forEach(p => {
    p.angle += p.speed;
    const x = centerX + Math.cos(p.angle) * p.distance;
    const y = centerY + Math.sin(p.angle) * (p.distance * 0.5); // Órbita elíptica

    ctx.beginPath();
    ctx.arc(x, y, p.radius, 0, Math.PI * 2);
    const hue = (colorShift + p.hueOffset + 45) % 360;
    ctx.fillStyle = `hsla(${hue}, 100%, 72%, ${p.alpha})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = `hsl(${hue}, 100%, 68%)`;
    ctx.fill();
  });

  requestAnimationFrame(animateGalaxy);
}
animateGalaxy();

// Generación de elementos orbitando (Girasoles y frases)
const phrases = [
  "Eres mi sol ☀️",
  "Mi Amor",
  "Eres preciosa ✨",
  "Me encantas 🌻",
  "Siempre juntos 💛",
  "Amor de mi vida",
  "Eres única 🌟",
  "Te adoro",
  "Tú haces brillar todo ✨",
  "Contigo todo es bonito 💫",
  "Mi sonrisa tiene tu nombre 💛"
];

// SVG de girasol codificado en base64 para uso directo
const sunflowerSVG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='32' r='12' fill='%235c3a21'/><g fill='%23ffcc00'><path d='M32 4 C30 16, 34 16, 32 4 Z'/><path d='M32 60 C30 48, 34 48, 32 60 Z'/><path d='M4 32 C16 30, 16 34, 4 32 Z'/><path d='M60 32 C48 30, 48 34, 60 32 Z'/><path d='M12 12 C22 20, 20 22, 12 12 Z'/><path d='M52 52 C42 44, 44 42, 52 52 Z'/><path d='M12 52 C20 42, 22 44, 12 52 Z'/><path d='M52 12 C44 20, 42 22, 52 12 Z'/></g></svg>";

const container = document.getElementById('floatingContainer');
const totalItems = phrases.length;
const itemsData = [];

function updateOrbitSizes() {
  const orbitScale = Math.min(window.innerWidth, window.innerHeight);
  itemsData.forEach(item => {
    item.radiusX = orbitScale * (window.innerWidth <= 600 ? 0.39 : 0.35);
    item.radiusY = orbitScale * (window.innerWidth <= 600 ? 0.18 : 0.20);
  });
}

phrases.forEach((phrase, index) => {
  const item = document.createElement('div');
  item.className = 'floating-item';
  
  item.innerHTML = `
    <img src="${sunflowerSVG}" alt="Girasol">
    <span>${phrase}</span>
  `;

  // Al hacer clic en cualquier elemento se abre la carta
  item.addEventListener('click', openModal);

  container.appendChild(item);

  // Parámetros para la órbita
  itemsData.push({
    element: item,
    angle: (index / totalItems) * Math.PI * 2,
    speed: 0.003,
    radiusX: Math.min(window.innerWidth, window.innerHeight) * 0.35,
    radiusY: Math.min(window.innerWidth, window.innerHeight) * 0.20
  });
});

updateOrbitSizes();
window.addEventListener('resize', updateOrbitSizes);

function animateOrbit() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  itemsData.forEach(item => {
    item.angle += item.speed;
    const x = centerX + Math.cos(item.angle) * item.radiusX;
    const y = centerY + Math.sin(item.angle) * item.radiusY;

    item.element.style.left = `${x}px`;
    item.element.style.top = `${y}px`;
  });

  requestAnimationFrame(animateOrbit);
}
animateOrbit();

// Lógica de la Carta Emergente
const modal = document.getElementById('letterModal');

function openModal() {
  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
}

// Abrir la carta también haciendo clic en el centro
document.querySelector('.center-heart').addEventListener('click', openModal);