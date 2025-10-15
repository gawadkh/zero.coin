// إطار مهام بسيط قابل للتوسع
window.Missions = (function(){
  // مهام تجريبية: كل مهمة تتطلب أوامر صحيحة بالتسلسل
  const missions = [
    {
      id: "intro-001",
      title: "اختراق بوابة الشركة X",
      steps: [
        { command: "scan", reply: "المسح جارٍ...\nالعقد المكتشفة: 3\nاستخدم connect node-2", xp: 5 },
        { command: "connect node-2", reply: "تم الاتصال بالعقدة node-2.\nاستخدم decrypt token-9", xp: 10 },
        { command: "decrypt token-9", reply: "فك التشفير ناجح.\nأعد إرسال hack لفتح القناة.", xp: 15 },
        { command: "hack", reply: "القناة مفتوحة ✔\nمهمة مكتملة.", xp: 20 }
      ],
      onComplete: "أحسنت! الوصول مُؤمّن. يمكنك اختيار مهمة أخرى لاحقًا."
    }
  ];

  function getMission(id){ return missions.find(m => m.id === id) || null; }

  return { missions, getMission };
})();
