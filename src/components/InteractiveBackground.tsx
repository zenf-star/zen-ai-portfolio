import { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

const DOT_GAP = 42;
const DOT_SIZE = 1.5;
const MOUSE_RADIUS = 130;

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  const springConfig = { damping: 20, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width: number;
    let height: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cols = Math.floor(width / DOT_GAP);
      const rows = Math.floor(height / DOT_GAP);
      const offsetLeft = (width - cols * DOT_GAP) / 2;
      const offsetTop = (height - rows * DOT_GAP) / 2;

      const curX = smoothX.get();
      const curY = smoothY.get();

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * DOT_GAP + offsetLeft;
          const y = j * DOT_GAP + offsetTop;

          const dx = curX - x;
          const dy = curY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let size = DOT_SIZE;
          let opacity = 0.15;
          let color = '#18181b'; // Zinc 900

          if (dist < MOUSE_RADIUS) {
            const factor = 1 - dist / MOUSE_RADIUS;
            size = DOT_SIZE + factor * 2;
            opacity = 0.15 + factor * 0.35;
          }

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = opacity;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothX, smoothY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
      <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
