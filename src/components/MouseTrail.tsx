import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  opacity: number;
}

const TRAIL_LENGTH = 25;
const FADE_SPEED = 0.93;
const MAX_SIZE = 14;

const MouseTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const mouse = useRef({ x: -100, y: -100 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    // Only show on devices with a mouse
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      points.current.unshift({ x: e.clientX, y: e.clientY, opacity: 1 });
      if (points.current.length > TRAIL_LENGTH) {
        points.current.length = TRAIL_LENGTH;
      }
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < points.current.length; i++) {
        const p = points.current[i];
        p.opacity *= FADE_SPEED;

        if (p.opacity < 0.01) {
          points.current.splice(i, 1);
          i--;
          continue;
        }

        const t = i / TRAIL_LENGTH;
        const size = MAX_SIZE * (1 - t) * p.opacity;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(49, 100%, 50%, ${p.opacity * (1 - t * 0.6)})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  );
};

export default MouseTrail;
