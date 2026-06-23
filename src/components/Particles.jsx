import { useEffect, useRef } from 'react';

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── floating dots ── */
    class Dot {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.vx = (Math.random() - .5) * .4;
        this.vy = (Math.random() - .5) * .4;
        this.r  = Math.random() * 1.8 + .4;
        this.o  = Math.random() * .4 + .08;
        this.hue = Math.random() < .3 ? 280 : 192; // cyan or purple
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue},100%,65%,${this.o})`;
        ctx.fill();
      }
    }

    /* ── shooting stars ── */
    class ShootingStar {
      constructor() { this.active = false; }
      spawn() {
        this.x  = Math.random() * canvas.width * .7;
        this.y  = Math.random() * canvas.height * .4;
        this.len   = Math.random() * 160 + 80;
        this.speed = Math.random() * 8 + 5;
        this.angle = (Math.PI / 180) * (35 + Math.random() * 20);
        this.life  = 1;
        this.active = true;
      }
      update() {
        this.x    += Math.cos(this.angle) * this.speed;
        this.y    += Math.sin(this.angle) * this.speed;
        this.life -= 0.018;
        if (this.life <= 0) this.active = false;
      }
      draw() {
        const tx = this.x - Math.cos(this.angle) * this.len;
        const ty = this.y - Math.sin(this.angle) * this.len;
        const g  = ctx.createLinearGradient(this.x, this.y, tx, ty);
        g.addColorStop(0, `rgba(0,212,255,${this.life})`);
        g.addColorStop(.4, `rgba(123,47,255,${this.life * .6})`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = g;
        ctx.lineWidth   = 1.5;
        ctx.stroke();
        /* glow head */
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.life})`;
        ctx.fill();
      }
    }

    /* ── pulse rings ── */
    class PulseRing {
      constructor() { this.active = false; }
      spawn() {
        this.x    = Math.random() * canvas.width;
        this.y    = Math.random() * canvas.height;
        this.r    = 0;
        this.maxR = Math.random() * 120 + 60;
        this.life = 1;
        this.active = true;
        this.color = Math.random() < .5 ? '0,212,255' : '123,47,255';
      }
      update() {
        this.r    += 1.2;
        this.life -= 0.012;
        if (this.life <= 0) this.active = false;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${this.color},${this.life * 0.25})`;
        ctx.lineWidth   = 1;
        ctx.stroke();
      }
    }

    const dots    = Array.from({ length: 75 }, () => new Dot());
    const stars   = Array.from({ length: 6  }, () => new ShootingStar());
    const rings   = Array.from({ length: 4  }, () => new PulseRing());

    let starTimer = 0;
    let ringTimer = 0;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* dots + connections */
      dots.forEach(d => { d.update(); d.draw(); });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${.1 * (1 - d / 110)})`;
            ctx.lineWidth   = .5;
            ctx.stroke();
          }
        }
      }

      /* shooting stars */
      starTimer++;
      if (starTimer > 180) {
        const s = stars.find(s => !s.active);
        if (s) s.spawn();
        starTimer = 0;
      }
      stars.forEach(s => { if (s.active) { s.update(); s.draw(); } });

      /* pulse rings */
      ringTimer++;
      if (ringTimer > 300) {
        const r = rings.find(r => !r.active);
        if (r) r.spawn();
        ringTimer = 0;
      }
      rings.forEach(r => { if (r.active) { r.update(); r.draw(); } });

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="particles-canvas" ref={canvasRef} />;
}
