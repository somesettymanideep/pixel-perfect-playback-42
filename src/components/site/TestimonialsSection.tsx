import { useEffect, useRef, useState } from "react";
import banner from "@/assets/testimonials-banner.jpg.asset.json";

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

  const pages = n;
  const index = ((i % n) + n) % n;
  const [animate, setAnimate] = useState(true);
  const slides = [...testimonials, ...testimonials.slice(0, perView)];
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
    const el = track.current;
    if (!el || reduce()) return;
    const place = () => {
      el.style.transition = animate ? "" : "none";
      el.style.transform = `translate3d(${-stepSize() * i}px, 0, 0)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [i, perView, animate]);

  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  useEffect(() => {
    if (paused || reduce()) return;
    const id = setInterval(() => setI((v) => v + 1), 4500);
    return () => clearInterval(id);
  }, [paused, pages]);

  const goTo = (next: number) => {
    if (reduce()) {
      const target = (next + n) % n;
      setI(target);
      viewport.current?.scrollTo({ left: stepSize() * target, behavior: "auto" });
      return;
    }
    if (next < 0) {
      // jump to the cloned end without animation, then slide back one
      setAnimate(false);
      setI(n);
      requestAnimationFrame(() => requestAnimationFrame(() => setI(n - 1)));
      return;
    }
    setI(next);
  };
  const onTransitionEnd = () => {
    if (i >= n) {
      setAnimate(false);
      setI(i - n);
    }
  };

  return (
    <section id="testimonials" tabIndex={-1} aria-roledescription="carousel" aria-label="Client testimonials" className="relative overflow-hidden">
      <img src={banner.url} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-brand-deep/60" />
        <div className="relative mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-44">
          <div className="mb-16 max-w-3xl">
            <p className="font-display text-3xl font-light uppercase tracking-[0.06em] text-paper sm:text-4xl xl:text-[3rem]">Voices</p>
            <h2 className="mt-6 font-display text-[1.75rem] font-light leading-[1.3] text-paper">What our <span className="italic text-teal-lift">clients say.</span></h2>
          </div>
          <p className="sr-only" aria-live="polite">
            Showing testimonials {index + 1} to {index + perView} of {n}
          </p>
        <div
          ref={viewport}
          className="testi-viewport"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onScroll={() => {
            if (!reduce()) return;
            const vp = viewport.current;
            const size = stepSize();
            if (!vp || !size) return;
            setI(Math.max(0, Math.min(n - 1, Math.round(vp.scrollLeft / size))));
          }}
        >
          <div ref={track} className="testi-track" onTransitionEnd={(e) => e.target === e.currentTarget && onTransitionEnd()}>
            {slides.map((t, k) => (
              <figure key={k} aria-roledescription="slide" aria-hidden={k >= n || undefined} aria-label={`Testimonial ${(k % n) + 1} of ${n}`} className="testi-card panel-deep flex flex-col rounded-[var(--radius)] border border-border bg-brand-deep/70 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-teal md:p-10">
                <span aria-hidden className="font-display text-6xl leading-[0.6] text-teal-lift">&ldquo;</span>
                <blockquote className="mt-6 font-display text-xl font-light italic leading-snug text-paper md:text-2xl">{t.q}</blockquote>
                <figcaption className="mt-auto flex items-center gap-4 pt-10">
                  <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-teal-lift/50 font-display text-lg text-teal-lift">{initials(t.n)}</span>
                  <span className="min-w-0">
                    <span className="block text-sm text-paper">{t.n}</span>
                    <span className="block text-[0.68rem] uppercase tracking-[0.28em] text-paper">{t.r}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="mt-12 flex items-center gap-6">
          <button type="button" aria-label="Previous testimonials" onClick={() => goTo(i - 1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:border-bronze">&larr;</button>
          <button type="button" aria-label="Next testimonials" onClick={() => goTo(i + 1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:border-bronze">&rarr;</button>
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
