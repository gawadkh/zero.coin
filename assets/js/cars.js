// خلفية رموز سيارات
const canvas = document.getElementById("cars-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const glyphs = "🚗🚙🛻🚕🚓🏎️🚘🚖🛺🚍🚛🚚";
const fontSize = 24;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawCarsMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff7b";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = glyphs[Math.floor(Math.random() * glyphs.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
  requestAnimationFrame(drawCarsMatrix);
}
drawCarsMatrix();

// محاكاة الطلبات
const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");
const avatar = document.getElementById("avatar");
const dealsEl = document.getElementById("deals");
const profitEl = document.getElementById("profit");

const avatars = [
  "face1.png", "face2.png", "face3.png", "face4.png", "face5.png"
];

let deals = 0;
let profit = 0;

function print(text) {
  terminal.textContent += text + "\n";
  terminal.scrollTop = terminal.scrollHeight;
}

function updateStats() {
  dealsEl.textContent = deals;
  profitEl.textContent = "$" + profit.toLocaleString();
}

function nextAvatar() {
  const random = avatars[Math.floor(Math.random() * avatars.length)];
  avatar.src = "assets/images/avatars/" + random;
}

function handleCommand(cmd) {
  const c = cmd.trim().toLowerCase();
  print("> " + cmd);

  if (c === "طلب") {
    const car = ["تويوتا", "مرسيدس", "بي إم دبليو", "تسلا", "فورد"][Math.floor(Math.random() * 5)];
    const price = Math.floor(Math.random() * 50000) + 20000;
    print(`عميل جديد يطلب سيارة: ${car}\nالسعر المقترح: $${price}`);
    deals++;
    profit += price;
    updateStats();
    nextAvatar();
  } else if (c === "مساعدة") {
    print("الأوامر المتاحة:\nطلب — استقبال طلب جديد\nمساعدة — عرض الأوامر\nخروج — العودة للصفحة الرئيسية");
  } else if (c === "خروج") {
    window.location.href = "main.html";
  } else {
    print("أمر غير معروف. اكتب 'مساعدة' لعرض الأوامر.");
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = input.value.trim();
    if (value) {
      handleCommand(value);
      input.value = "";
    }
  }
});

// بدء تلقائي
print("مرحباً بك في قسم السيارات.\nاكتب 'طلب' لاستقبال أول عميل.");
