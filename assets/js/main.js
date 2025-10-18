// خلفية ماتركس
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const glyphs = "آأبتثجحخدذرزسشصضطظعغفقكلمنهوىي؟؛،ـ";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
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
  requestAnimationFrame(drawMatrix);
}
drawMatrix();

// محرك الأوامر
const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");

let state = localStorage.getItem("matrix_state") || "start";
let serial = "";

function print(text) {
  terminal.textContent += text + "\n";
  terminal.scrollTop = terminal.scrollHeight;
}

function saveState(newState) {
  state = newState;
  localStorage.setItem("matrix_state", state);
}

function handleCommand(cmd) {
  const c = cmd.trim();
  print("> " + c);

  switch (state) {
    case "start":
      print("hello world / مرحبا يا صاح");
      setTimeout(() => print("?wake up ! .. who are you / استيقظ !.. من انت ؟"), 600);
      setTimeout(() => print("Enter your serial number../ادخل رقمك التسلسلي.."), 1200);
      saveState("await_serial");
      break;

    case "await_serial":
      if (/^\d{6}$/.test(c)) {
        serial = c;
        print("Welcome to the matrix. What is your goal? - (Work) (Play)\nاهلا بك في المصفوفة ما هو هدفك ؟ - (العمل) (اللعب)");
        saveState("choose_goal");
      } else {
        print("Wrong command, you must enter 6 digits\nامر خاطئ يجب ادخال 6 ارقام");
      }
      break;

    case "choose_goal":
      if (c === "اللعب") {
        print("ليس لدينا وقت للعب مع الأطفال أمثالك…");
        saveState("end");
      } else if (c === "العمل") {
        print("ما هو المجال الذي تريد العمل به؟ (التجارة) (جمع المعلومات) (البرمجة)");
        saveState("choose_field");
      } else {
        print("خطأ في الأمر / Error in the command");
      }
      break;

    case "choose_field":
      if (c === "التجارة") {
        print("خيار جيد لكن نحن لا نبيع الفاكهة والخضار هنا..\nما التخصص الذي ترغب به ؟ (السيارات)(الأسلحة)(التقنيات)");
        saveState("choose_trade");
      } else if (c === "جمع المعلومات") {
        print("هذا مثير للاهتمام ! هل انت عميل سابق في احدى الوكالات ؟..\nلا اتوقع ان تجيب على سؤالي لكن لا بأس لنرى مهاراتك في جمع البيانيات عن الهدف المطلوب");
        saveState("cia");
        setTimeout(() => window.location.href = "cia.html", 2000);
      } else if (c === "البرمجة") {
        print("يبدو انه وجدنا هاكر هذا العصر... لنختبر قدرتك على الاختراق");
        saveState("hak");
        setTimeout(() => window.location.href = "hak.html", 2000);
      } else {
        print("خطأ في الأمر / Error in the command");
      }
      break;

    case "choose_trade":
      if (c === "السيارات") {
        print("جميل جدا لنرى مدى خبرتك في عالم السيارات");
        saveState("cars");
        setTimeout(() => window.location.href = "cars.html", 2000);
      } else if (c === "الأسلحة") {
        print("اذا تحب اللعب بالنار.. اتبعني..");
        saveState("guns");
        setTimeout(() => window.location.href = "guns.html", 2000);
      } else if (c === "التقنيات") {
        print("هذا المجال للمهووسين في التكنولوجيا.. هيا يا عبقرينو..");
        saveState("tecno");
        setTimeout(() => window.location.href = "tecno.html", 2000);
      } else {
        print("خطأ في الأمر / Error in the command");
      }
      break;

    default:
      print("تم إنهاء هذه المرحلة. أعد تحميل الصفحة للبدء من جديد.");
      break;
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
if (state === "start") {
  handleCommand("");
}
