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

// المحرك التفاعلي
const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");

let state = localStorage.getItem("matrix_state") || "start";
let serial = localStorage.getItem("matrix_serial") || "";
let stateHistory = JSON.parse(localStorage.getItem("matrix_history") || "[]");

function print(text) {
  terminal.textContent += text + "\n";
  terminal.scrollTop = terminal.scrollHeight;
}

function saveState(newState) {
  if (state && state !== newState) {
    stateHistory.push(state);
    localStorage.setItem("matrix_history", JSON.stringify(stateHistory));
  }
  state = newState;
  localStorage.setItem("matrix_state", state);
}

function resetAll() {
  state = "start";
  serial = "";
  stateHistory = [];
  localStorage.removeItem("matrix_state");
  localStorage.removeItem("matrix_serial");
  localStorage.removeItem("matrix_history");
  terminal.textContent = "";
  print("تمت إعادة المحاكاة من البداية...");
  setTimeout(() => handleCommand(""), 600);
}

function goBack() {
  while (stateHistory.length > 0) {
    const prev = stateHistory.pop();
    if (!["end", "cars", "guns", "tecno", "cia", "hak"].includes(prev)) {
      state = prev;
      localStorage.setItem("matrix_state", state);
      localStorage.setItem("matrix_history", JSON.stringify(stateHistory));
      print("تم الرجوع إلى المرحلة السابقة.");
      return;
    }
  }
  print("لا يمكن الرجوع أكثر.");
}

function handleCommand(cmd) {
  const c = cmd.trim();
  if (!c && state === "start") {
    print("hello world / مرحبا يا صاح");
    setTimeout(() => print("?wake up ! .. who are you / استيقظ !.. من انت ؟"), 600);
    setTimeout(() => print("Enter your serial number../ادخل رقمك التسلسلي.."), 1200);
    saveState("await_serial");
    return;
  }

  print("> " + c);

  // أوامر عالمية
  if (c === "إعادة") return resetAll();
  if (c === "رجوع") return goBack();
  if (c === "حالة") return print("الحالة الحالية: " + state);

  switch (state) {
    case "await_serial":
      if (/^\d{6}$/.test(c)) {
        serial = c;
        localStorage.setItem("matrix_serial", serial);
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
        print("يمكنك كتابة 'إعادة' للبدء من جديد.");
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

    case "end":
      print("تم إنهاء هذه المرحلة. يمكنك كتابة 'إعادة' للبدء من جديد أو 'رجوع' للعودة خطوة.");
      break;

    default:
      print("لا يمكن تفسير هذا الأمر في هذه المرحلة.");
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

// بدء تلقائي إن كانت الحالة "start"
if (state === "start") {
  handleCommand("");
}
