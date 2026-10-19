import { useEffect, useRef, useState } from "react";
import testiBg from "@/assets/testi-bg.jpg";

type Testimonial = { q: string; n: string; r: string };

const initials = (name: string) =>
  name.split(" ").filter(Boolean).map((word) => word[0]).join("").slice(0, 2).toUpperCase();

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const n = testimonials.length;
  const [perView, setPerView] = useState(3);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  const pages = Math.max(1, n - perView + 1);
  const index = Math.min(i, pages - 1);
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stepSize = () => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return 0;
    return card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
  };

  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (i > pages - 1) setI(pages - 1);
  }, [i, pages]);

  useEffect(() => {
    const el = track.current;
    if (!el || reduce()) return;
    const place = () => {
      el.style.transform = `translate3d(${-stepSize() * index}px, 0, 0)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [index, perView]);

  useEffect(() => {
    if (paused || reduce()) return;
    const id = setInterval(() => setI((v) => (v >= pages - 1 ? 0 : v + 1)), 7000);
    return () => clearInterval(id);
  }, [paused, pages]);

  const goTo = (next: number) => {
    const target = (next + pages) % pages;
    setI(target);
    if (reduce()) viewport.current?.scrollTo({ left: stepSize() * target, behavior: "auto" });
  };

  return (
    <section id="testimonials" tabIndex={-1} aria-roledescription="carousel" aria-label="Client testimonials" className="relative overflow-hidden">
      <img src={testiBg} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-background/75" />
      <div className="relative mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-44">
        <p className="label-num !text-sm">04 — Voices</p>
        <p className="sr-only" aria-live="polite">
          Showing testimonials {index + 1} to {index + perView} of {n}
        </p>
        <div
          ref={viewport}
          className="testi-viewport mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onScroll={() => {
            if (!reduce()) return;
            const vp = viewport.current;
            const size = stepSize();
            if (!vp || !size) return;
            setI(Math.max(0, Math.min(pages - 1, Math.round(vp.scrollLeft / size))));
          }}
        >
          <div ref={track} className="testi-track">
            {testimonials.map((t, k) => (
              <figure key={k} aria-roledescription="slide" aria-label={`Testimonial ${k + 1} of ${n}`} className="testi-card panel-deep flex flex-col rounded-[var(--radius)] border border-border bg-brand-deep/70 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-teal md:p-10">
                <span aria-hidden className="font-display text-6xl leading-[0.6] text-teal-lift">&ldquo;</span>
                <blockquote className="mt-6 font-display text-xl font-light italic leading-snug md:text-2xl">{t.q}</blockquote>
                <figcaption className="mt-auto flex items-center gap-4 pt-10">
                  <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-teal-lift/50 font-display text-lg text-teal-lift">{initials(t.n)}</span>
                  <span className="min-w-0">
                    <span className="block text-sm">{t.n}</span>
                    <span className="block text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">{t.r}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="mt-12 flex items-center gap-6">
          <button type="button" aria-label="Previous testimonials" onClick={() => goTo(index - 1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:border-bronze">&larr;</button>
          <button type="button" aria-label="Next testimonials" onClick={() => goTo(index + 1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:border-bronze">&rarr;</button>
          <div className="ml-4 hidden flex-1 gap-2 sm:flex" aria-hidden>
            {Array.from({ length: pages }).map((_, k) => (
              <span key={k} className="h-px flex-1 bg-border">
                <span className={`block h-full bg-bronze transition-all duration-700 ${k <= index ? "w-full" : "w-0"}`} />
              </span>
            ))}
          </div>
          <span className="text-xs tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")} / {String(pages).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
