// خلفية مطر الرموز (ماتركس)
(function(){
  const canvas = document.getElementById('matrix');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const glyphs = "آأبتثجحخدذرزسشصضطظعغفقكلمنهوىي؟؛،ـ﴾﴿⟂";
  const fontSize = Math.max(14, Math.floor(window.innerWidth / 80));
  let columns = Math.ceil(canvas.width / fontSize);
  let drops = Array.from({ length: columns }, () => Math.floor(Math.random() * canvas.height));

  function init(){
    columns = Math.ceil(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => Math.floor(Math.random() * canvas.height));
  }
  window.addEventListener('resize', init);

  function draw(){
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff7b";
    ctx.shadowColor = "#00ff7b";
    ctx.shadowBlur = 8;
    ctx.font = `${fontSize}px "Amiri","Cairo",monospace`;

    for(let i = 0; i < drops.length; i++){
      const text = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(text, x, y);
      if(y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      else drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
