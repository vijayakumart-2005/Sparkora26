import { useEffect, useRef } from "react";

/**
 * Full-page attractive static background.
 * Remains fixed in the viewport while the slide sections overlay and scroll above it.
 * Features:
 * - Deep space canvas with vibrant nebula glow orbs (cyan, electric blue, violet, ember)
 * - Fine cyber grid backdrop with radial mask
 * - Canvas engine: Connected constellation nodes, mouse reactivity, twinkling stars, and rising sparks
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05070e]"
    >
      {/* Deep ambient base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(13, 27, 62, 0.7) 0%, rgba(5, 7, 14, 0.95) 75%, #05070e 100%)",
        }}
      />

      {/* Cyber Tech Grid Floor with radial vignette mask */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%)",
        }}
      />

      {/* Radiant Glowing Nebula Orbs */}
      {/* 1. Electric Blue / Cyan Top-Left */}
      <div
        className="absolute -top-[10%] -left-[10%] h-[750px] w-[750px] rounded-full opacity-45 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.7) 0%, rgba(37, 99, 235, 0.5) 45%, transparent 70%)",
          animation: "orb-float-1 22s ease-in-out infinite alternate",
        }}
      />

      {/* 2. Royal Violet / Magenta Center-Right */}
      <div
        className="absolute top-[28%] -right-[8%] h-[650px] w-[650px] rounded-full opacity-35 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.65) 0%, rgba(99, 102, 241, 0.45) 50%, transparent 70%)",
          animation: "orb-float-2 26s ease-in-out infinite alternate",
        }}
      />

      {/* 3. Radiant Ember / Gold Bottom-Left */}
      <div
        className="absolute bottom-[5%] left-[8%] h-[600px] w-[600px] rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 0, 0.6) 0%, rgba(245, 158, 11, 0.4) 45%, transparent 70%)",
          animation: "orb-float-3 24s ease-in-out infinite alternate",
        }}
      />

      {/* 4. Deep Cyan Glow Bottom-Right */}
      <div
        className="absolute -bottom-[10%] right-[15%] h-[550px] w-[550px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.55) 0%, rgba(59, 130, 246, 0.35) 50%, transparent 70%)",
          animation: "orb-float-4 20s ease-in-out infinite alternate",
        }}
      />

      {/* Horizontal Light Streak Beams */}
      <div
        className="absolute top-[22%] left-0 h-[1.5px] w-56 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 streak"
        style={{ animationDuration: "11s" }}
      />
      <div
        className="absolute top-[58%] left-0 h-[1.5px] w-48 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-40 streak"
        style={{ animationDuration: "14s", animationDelay: "4s" }}
      />
      <div
        className="absolute top-[82%] left-0 h-[1.5px] w-64 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-35 streak"
        style={{ animationDuration: "16s", animationDelay: "8s" }}
      />

      {/* Ambient Aurora Wave */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh] opacity-15"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(6, 182, 212, 0.25) 30%, rgba(139, 92, 246, 0.2) 60%, transparent 100%)",
          animation: "aurora-shift 18s ease-in-out infinite alternate",
        }}
      />

      {/* Interactive Constellation & Cosmic Canvas */}
      <ConstellationCanvas />
    </div>
  );
}

interface ConstellationNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  isEmber: boolean;
}

interface Spark {
  x: number;
  y: number;
  vy: number;
  vx: number;
  r: number;
  life: number;
  maxLife: number;
}

interface Star {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
  bright: boolean;
}

function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    let nodes: ConstellationNode[] = [];
    let stars: Star[] = [];
    let sparks: Spark[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Static/twinkling stars
      const starCount = Math.min(100, Math.round((width * height) / 14000));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.8,
        bright: Math.random() < 0.15,
      }));

      // 2. Interactive constellation nodes
      const nodeCount = Math.min(55, Math.round((width * height) / 28000));
      nodes = Array.from({ length: nodeCount }, () => {
        const isEmber = Math.random() < 0.28;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
          r: Math.random() * 1.6 + 0.9,
          color: isEmber
            ? "rgba(255, 140, 50, "
            : Math.random() < 0.5
            ? "rgba(6, 182, 212, "
            : "rgba(129, 140, 248, ",
          isEmber,
        };
      });

      // 3. Upward floating embers
      sparks = Array.from({ length: 18 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(0.35 + Math.random() * 0.6),
        r: Math.random() * 1.2 + 0.5,
        life: Math.random() * 200,
        maxLife: 220 + Math.random() * 180,
      }));
    };

    const handlePointerMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handlePointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const maxLineDist = 110;
    const maxLineDistSq = maxLineDist * maxLineDist;
    const mouseRadiusSq = 140 * 140;

    let t = 0;
    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw twinkling background stars
      for (const s of stars) {
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.bright ? s.r * 1.3 : s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.bright
          ? `rgba(215, 235, 255, ${tw * 0.85})`
          : `rgba(180, 205, 255, ${tw * 0.5})`;
        ctx.fill();

        // Extra twinkle cross on bright stars
        if (s.bright && tw > 0.85) {
          ctx.strokeStyle = `rgba(215, 235, 255, ${(tw - 0.85) * 2})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - 3, s.y);
          ctx.lineTo(s.x + 3, s.y);
          ctx.moveTo(s.x, s.y - 3);
          ctx.lineTo(s.x, s.y + 3);
          ctx.stroke();
        }
      }

      // 2. Update and draw nodes with constellation connection lines
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]!;

        // Mouse interaction
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < mouseRadiusSq) {
          const force = (1 - md2 / mouseRadiusSq) * 0.45;
          const dist = Math.sqrt(md2) || 1;
          n.vx += (mdx / dist) * force;
          n.vy += (mdy / dist) * force;
        }

        // Apply friction
        n.vx *= 0.985;
        n.vy *= 0.985;
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around bounds
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;

        // Draw connections with subsequent nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]!;
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxLineDistSq) {
            const alpha = (1 - d2 / maxLineDistSq) * 0.28;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle =
              n.isEmber || n2.isEmber
                ? `rgba(255, 150, 70, ${alpha * 0.9})`
                : `rgba(90, 180, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}0.8)`;
        ctx.fill();

        // Node glow halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}0.15)`;
        ctx.fill();
      }

      // 3. Draw upward floating sparks (embers)
      for (const sp of sparks) {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life += 1;

        if (sp.life > sp.maxLife || sp.y < -10) {
          sp.x = Math.random() * width;
          sp.y = height + 10;
          sp.life = 0;
          sp.vy = -(0.35 + Math.random() * 0.6);
        }

        const progress = sp.life / sp.maxLife;
        const alpha = Math.sin(progress * Math.PI) * 0.75;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 140, 40, ${alpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-85 pointer-events-none"
    />
  );
}
