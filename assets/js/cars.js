// خلفية مفكات سيارات
const canvas = document.getElementById("cars-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const glyphs = "🔧";
const fontSize = 24;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawCarsMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00cfff";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = glyphs;
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
  requestAnimationFrame(drawCarsMatrix);
}
drawCarsMatrix();

// المحاكاة
const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");
const avatar = document.getElementById("avatar");
const dealsEl = document.getElementById("deals");
const profitEl = document.getElementById("profit");

const avatars = ["face1.png", "face2.png", "face3.png", "face4.png"];
let deals = 0;
let profit = 0;
let currentRequest = null;
let currentOptions = [];

function print(text) {
  terminal.textContent += text + "\n";
  terminal.scrollTop = terminal.scrollHeight;
}

function updateStats() {
  dealsEl.textContent = deals;
  profitEl.textContent = "$" + profit;
}

function nextAvatar() {
  const random = avatars[Math.floor(Math.random() * avatars.length)];
  avatar.src = "assets/images/avatars/" + random;
}

function generateRequest() {
  const hp = Math.floor(Math.random() * 200) + 300;
  const speed = Math.floor(Math.random() * 100) + 150;
  const price = Math.floor(Math.random() * 10000) + 10000;
  currentRequest = { hp, speed, price };
  print(`عميل جديد يطلب سيارة:\nقوة ${hp} حصان - سرعة ${speed} كم/س - بسعر $${price}`);
  nextAvatar();
  generateOptions();
}

function generateOptions() {
  const brands = ["فورد", "تويوتا", "شيفروليه"];
  currentOptions = brands.map(brand => {
    return {
      brand,
      hp: Math.floor(Math.random() * 200) + 300,
      speed: Math.floor(Math.random() * 100) + 150,
      price: Math.floor(Math.random() * 10000) + 10000
    };
  });

  currentOptions.forEach((opt, i) => {
    print(`${i + 1}- ${opt.brand} - ${opt.hp} حصان - ${opt.speed} كم/س - بسعر $${opt.price}`);
  });

  print("اختر السيارة الأنسب (1 أو 2 أو 3)");
}

function evaluateChoice(choice) {
  const selected = currentOptions[choice - 1];
  let match = 0;
  if (Math.abs(selected.hp - currentRequest.hp) <= 50) match++;
  if (Math.abs(selected.speed - currentRequest.speed) <= 20) match++;
  if (Math.abs(selected.price - currentRequest.price) <= 500) match++;

  if (match >= 2) {
    print("👍 العميل موافق! صفقة ناجحة.");
    deals++;
