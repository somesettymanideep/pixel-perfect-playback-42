import { useEffect, useRef, useState } from "react";

/** Arrow at exact pointer + inertial CSS-3D pyramid with fading teal trail. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const arrow = useRef<HTMLDivElement>(null);
  const pyr = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      c.width = innerWidth * dpr; c.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const m = { x: -100, y: -100 }, p = { x: -100, y: -100 };
    let rot = 0, spin = 0, scale = 1, targetScale = 1, visible = false;
    const trail: { x: number; y: number; t: number }[] = [];
    const teal = getComputedStyle(document.documentElement).getPropertyValue("--teal").trim();

    const move = (e: PointerEvent) => {
      m.x = e.clientX; m.y = e.clientY;
      if (!visible) { p.x = m.x; p.y = m.y; visible = true; }
      arrow.current!.style.transform = `translate3d(${m.x}px, ${m.y}px, 0)`;
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [role=button], label, select");
      const field = t.closest("input, textarea");
      const view = t.closest("[data-cursor=view]");
      targetScale = field ? 0.5 : interactive ? 1.45 : 1;
      label.current!.style.opacity = view ? "1" : "0";
      pyr.current!.style.opacity = field ? "0.35" : "1";
    };
    const leave = () => { visible = false; arrow.current!.style.opacity = "0"; pyr.current!.style.opacity = "0"; };
    const enter = () => { arrow.current!.style.opacity = "1"; pyr.current!.style.opacity = "1"; };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);

    let raf = 0;
    const tick = () => {
      const tx = m.x + 22, ty = m.y + 24;
      const k = reduce ? 1 : 0.16;
      const dx = tx - p.x, dy = ty - p.y;
      p.x += dx * k; p.y += dy * k;
      const vel = Math.hypot(dx, dy);
      const tilt = Math.max(-35, Math.min(35, dx * 0.6));
      rot += (tilt - rot) * 0.12;
      spin += reduce ? 0 : 0.4 + Math.min(vel, 40) * 0.05 + (targetScale > 1 ? 1.2 : 0);
      scale += (targetScale - scale) * 0.15;
      pyr.current!.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      inner.current!.style.transform = `scale(${scale}) rotateX(${-18 - dy * 0.3}deg) rotateZ(${rot * 0.3}deg) rotateY(${spin}deg)`;

      const now = performance.now();
      if (vel > 0.6 && visible && !reduce) trail.push({ x: p.x, y: p.y, t: now });
      while (trail.length && now - trail[0].t > 260) trail.shift();
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 1; i < trail.length; i++) {
        const a = 1 - (now - trail[i].t) / 260;
        ctx.strokeStyle = teal; ctx.globalAlpha = a * 0.55; ctx.lineWidth = a * 1.5;
        ctx.beginPath(); ctx.moveTo(trail[i - 1].x, trail[i - 1].y); ctx.lineTo(trail[i].x, trail[i].y); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;
  const face = "absolute left-0 top-0 h-0 w-0 origin-bottom";
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      <div ref={pyr} className="absolute left-0 top-0 transition-opacity duration-300" style={{ perspective: 300 }}>
        <div ref={inner} className="relative -ml-[9px] -mt-[14px] h-[14px] w-[18px]" style={{ transformStyle: "preserve-3d" }}>
          {[0, 90, 180, 270].map((deg, i) => (
            <div
              key={deg}
              className={face}
              style={{
                borderLeft: "9px solid transparent",
                borderRight: "9px solid transparent",
                borderBottom: `16px solid color-mix(in oklch, var(--${i % 2 ? "teal" : "bronze"}) ${[95, 70, 45, 80][i]}%, var(--charcoal))`,
                transform: `rotateY(${deg}deg) translateZ(9px) rotateX(29deg)`,
                transformOrigin: "50% 100%",
                filter: "drop-shadow(0 0 0.5px var(--ivory))",
              }}
            />
          ))}
          <div className="absolute left-0 top-[14px] h-[18px] w-[18px] bg-charcoal" style={{ transform: "rotateX(90deg) translateZ(-2px)" }} />
        </div>
        <span ref={label} className="absolute left-5 top-0 text-[10px] uppercase tracking-[0.3em] text-ivory opacity-0 transition-opacity">View</span>
      </div>
      <div ref={arrow} className="absolute left-0 top-0">
        <svg width="18" height="22" viewBox="0 0 18 22" className="-translate-x-[1px] -translate-y-[1px]">
          <path d="M1 1 L1 17 L5.5 12.8 L8.6 20 L11.4 18.8 L8.4 11.8 L14.5 11.6 Z" fill="var(--ivory)" stroke="var(--charcoal)" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
