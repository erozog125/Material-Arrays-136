/* =====================================================
   background.js — Constelaciones animadas (canvas)
   Reemplaza el efecto aurora por estrellas con conexiones.
   ===================================================== */

const initAuroraBackground = () => {
  const canvas = document.getElementById("aurora");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const CFG = {
    count: 120,
    maxDist: 145,
    speed: 0.22,
  };

  let W = 0, H = 0, frame = 0;
  const stars = [];

  class Star {
    constructor() { this.spawn(true); }

    spawn(random = false) {
      this.x  = random ? Math.random() * W : (Math.random() < 0.5 ? -10 : W + 10);
      this.y  = random ? Math.random() * H : Math.random() * H;
      this.r  = Math.random() * 1.3 + 0.3;
      this.vx = (Math.random() - 0.5) * CFG.speed;
      this.vy = (Math.random() - 0.5) * CFG.speed;
      this.phase = Math.random() * Math.PI * 2;
      this.rate  = Math.random() * 0.018 + 0.006;
      this.base  = Math.random() * 0.45 + 0.35;
    }

    alpha() {
      return Math.max(0.05, this.base + 0.28 * Math.sin(frame * this.rate + this.phase));
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) {
        this.spawn();
      }
    }

    draw() {
      const a = this.alpha();
      if (this.r > 1.0) {
        ctx.shadowBlur  = 7;
        ctx.shadowColor = `rgba(80,200,255,${a * 0.9})`;
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(160,220,255,${a})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };

  const initStars = () => {
    stars.length = 0;
    for (let i = 0; i < CFG.count; i++) stars.push(new Star());
  };

  const drawLinks = () => {
    const md2 = CFG.maxDist * CFG.maxDist;
    for (let i = 0; i < stars.length - 1; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < md2) {
          const a = (1 - Math.sqrt(d2) / CFG.maxDist) * 0.13;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(80,190,255,${a})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
  };

  const tick = () => {
    frame++;
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => s.update());
    drawLinks();
    stars.forEach(s => s.draw());
    requestAnimationFrame(tick);
  };

  resize();
  window.addEventListener("resize", () => { resize(); initStars(); });
  initStars();
  tick();
};

initAuroraBackground();
