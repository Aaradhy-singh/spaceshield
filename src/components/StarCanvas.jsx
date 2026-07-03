import React, { useRef, useEffect } from 'react';

export default function StarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    const stars = [];
    for (let i = 0; i < 2000; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.3 + Math.random() * 1.5,
        targetOpacity: 0.2 + Math.random() * 0.8,
        opacity: 0.2 + Math.random() * 0.8
      });
    }

    let lastFlicker = 0;
    
    let shootingStar = null;
    let lastShootingStar = 0;

    let animationFrameId;

    const render = (time) => {
      ctx.fillStyle = '#060B14';
      ctx.fillRect(0, 0, width, height);

      if (time - lastFlicker > 3000) {
        lastFlicker = time;
        for (let i = 0; i < 30; i++) {
          const idx = Math.floor(Math.random() * stars.length);
          stars[idx].targetOpacity = 0.2 + Math.random() * 0.8;
        }
      }

      stars.forEach(star => {
        star.opacity += (star.targetOpacity - star.opacity) * 0.05;
        
        ctx.beginPath();
        ctx.arc(star.x, Math.max(0, Math.min(height, star.y)), star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      if (time - lastShootingStar > 12000 && !shootingStar) {
        lastShootingStar = time;
        shootingStar = {
          startX: width * 0.5 + Math.random() * width * 0.5,
          startY: Math.random() * (height * 0.5),
          progress: 0, 
          duration: 1000,
          startTime: time
        };
      }

      if (shootingStar) {
        const elapsed = time - shootingStar.startTime;
        shootingStar.progress = elapsed / shootingStar.duration;

        if (shootingStar.progress >= 1) {
          shootingStar = null;
        } else {
          const p = shootingStar.progress;
          const opacity = p < 0.5 ? p * 2 : (1 - p) * 2;
          
          const x = shootingStar.startX - (width * 0.8) * p;
          const y = shootingStar.startY + (height * 0.8) * p;

          const tailLength = 150;
          const tailX = x + tailLength * 0.8;
          const tailY = y - tailLength * 0.8;

          const grad = ctx.createLinearGradient(x, y, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(tailX, tailY);
          ctx.lineWidth = 2;
          ctx.strokeStyle = grad;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: '#060B14'
      }}
    />
  );
}
