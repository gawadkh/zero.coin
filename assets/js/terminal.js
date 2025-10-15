// ترمينال أوامر مع دعم مهام وXP
window.Terminal = (function(){
  function create(opts){
    const termEl = opts.terminalEl;
    const inputEl = opts.inputEl;
    const sendBtn = opts.sendBtn;
    const onXpGain = typeof opts.onXpGain === "function" ? opts.onXpGain : ()=>{};

    // أوامر أساسية
    const commands = {
      help: "الأوامر:\n help — قائمة الأوامر\n about — وصف النظام\n hack — محاكاة اختراق\n clear — مسح الشاشة\n scan/connect/decrypt — خطوات مهام",
      about: "MATRIX — نظام محاكاة هاك عربي. أنشئ مهام، اجمع XP، وافتح قدرات.",
      hack: "جارٍ التنفيذ...\nتم الوصول ✔",
      clear: "__CLEAR__"
    };

    // حالة مهمة جارية (اختيارية)
    let currentMission = window.Missions.getMission("intro-001");
    let stepIndex = 0;

    function print(text){
      termEl.textContent += text + "\n";
      termEl.scrollTop = termEl.scrollHeight;
    }

    function run(cmd){
      const raw = cmd;
      const c = cmd.trim();

      if(!c) return;

      // إظهار الإدخال
      print("> " + raw);

      // clear
      if(c.toLowerCase() === "clear"){
        termEl.textContent = "";
        return;
      }

      // إن كانت هناك مهمة جارية: تحقق من الخطوة الحالية
      if(currentMission){
        const step = currentMission.steps[stepIndex];
        if(step && c.toLowerCase() === step.command.toLowerCase()){
          setTimeout(()=>{
            print(step.reply);
            onXpGain(step.xp || 5);
            stepIndex++;
            if(stepIndex >= currentMission.steps.length){
              print(currentMission.onComplete || "مهمة مكتملة.");
              // إنهاء المهمة
              currentMission = null;
            } else {
              // تلميح للخطوة التالية
              const next = currentMission.steps[stepIndex];
              if(next){
                print("تلميح: " + next.command);
              }
            }
          }, 250);
          return;
        }
      }

      // أوامر عامة
      const key = c.toLowerCase();
      if(commands[key]){
        setTimeout(()=>{
          if(commands[key] === "__CLEAR__"){ termEl.textContent = ""; return; }
          print(commands[key]);
          // XP بسيط لأمر hack
          if(key === "hack") onXpGain(10);
        }, 250);
      } else {
        setTimeout(()=> print("خطأ: الأمر غير معروف"), 250);
      }
    }

    // ربط الأحداث
    sendBtn.addEventListener("click", ()=>{
      const v = inputEl.value;
      inputEl.value = "";
      run(v);
    });
    inputEl.addEventListener("keydown", (e)=>{
      if(e.key === "Enter"){
        sendBtn.click();
      }
    });

    // واجهة عامة
    return { print, run };
  }

  return { create };
})();
