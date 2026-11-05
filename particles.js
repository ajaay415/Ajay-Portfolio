(() => {
  const canvas = document.getElementById('particles');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let points = [], raf;
  const resize = () => {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = innerWidth * ratio; canvas.height = innerHeight * ratio;
    canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px';
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    points = Array.from({length: Math.min(55, Math.floor(innerWidth / 24))}, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18, r: Math.random() * 1.2 + .3
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    points.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(132,174,220,.55)'; ctx.fill();
      for (let j = i + 1; j < points.length; j++) {
        const q = points[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 115) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(105,190,220,${(1 - d / 115) * .09})`;
          ctx.lineWidth = .7; ctx.stroke();
        }
      }
    });
    raf = requestAnimationFrame(draw);
  };
  addEventListener('resize', resize); resize(); draw();
  addEventListener('pagehide', () => cancelAnimationFrame(raf));
})();