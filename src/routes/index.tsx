import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Cursor } from "@/components/site/Cursor";
import { ConsultationForm } from "@/components/site/ConsultationForm";
import logo from "@/assets/sea-logo.png.asset.json";
import hero from "@/assets/hero.jpg";
import sArch from "@/assets/s-arch.jpg";
import sInterior from "@/assets/s-interior.jpg";
import sLandscape from "@/assets/s-landscape.jpg";
import sStructural from "@/assets/s-structural.jpg";
import sProjectManagement from "@/assets/s-project-management.webp.asset.json";
import sBim from "@/assets/s-bim.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import testiBg from "@/assets/testi-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEA — Architecture That Shapes How You Live" },
      { name: "description", content: "Studio for Eclectic Architecture: architecture, interiors, landscape and turnkey execution for spaces with lasting presence." },
      { property: "og:title", content: "SEA — Studio for Eclectic Architecture" },
      { property: "og:description", content: "Architecture, interiors and landscapes crafted with lasting presence." },
    ],
  }),
  component: Index,
});

const NAV = [
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Studio", "#stats"],
  ["Contact", "#contact"],
] as const;

const SERVICES = [
  { t: "Architectural Design", d: "Sculptural residences and buildings conceived from site, light and the rituals of the people who live in them.", img: sArch },
  { t: "Interior Design", d: "Material-led interiors — stone, timber, bronze — composed with restraint and detailed to the millimetre.", img: sInterior },
  { t: "Landscape Design", d: "Courtyards, water and planting that extend architecture outward and soften its edges over time.", img: sLandscape },
  { t: "Structural Design", d: "Efficient structural frameworks — concrete, steel and timber — engineered quietly beneath the architecture.", img: sStructural },
  { t: "Project Management", d: "Programme, budget and site coordination under one roof, so decisions land on time and on budget.", img: sProjectManagement.url },
  { t: "BIM Services", d: "Coordinated digital models that resolve every clash before the first brick is laid on site.", img: sBim },
];

// Editable placeholders — replace with the studio's real figures.
const STATS = [
  { v: 0, suffix: "+", l: "Projects Completed" },
  { v: 0, suffix: "k sq ft", l: "Area Designed" },
  { v: 0, suffix: "", l: "Years of Experience" },
  { v: 0, suffix: "%", l: "Client Satisfaction" },
];

const PROJECTS = [
  { n: "Terrace House", loc: "Lonavala, India", cat: "Residence", y: "2025", img: p1 },
  { n: "Shell Pavilion", loc: "Ahmedabad, India", cat: "Cultural", y: "2024", img: p2 },
  { n: "Skyline Residence", loc: "Mumbai, India", cat: "Interior", y: "2024", img: p3 },
];

// Sample testimonials — replace with real client feedback.
const TESTIMONIALS = [
  { q: "They listened to how we wanted to live before drawing a single line. The house feels inevitable now.", n: "Sample Client", r: "Private Residence" },
  { q: "Every material, every junction was considered. It is the calmest place we have ever lived.", n: "Sample Client", r: "Penthouse Interior" },
  { q: "From design to handover they carried the whole project. We simply moved in.", n: "Sample Client", r: "Turnkey Villa" },
];

function Index() {
  const root = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let lenis: InstanceType<typeof Lenis> | null = null;
      const raf = (t: number) => lenis?.raf(t * 1000);
      if (!reduce) {
        lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
      }

      const onAnchor = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        const el = document.querySelector(a.getAttribute("href")!);
        if (!el) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
        else el.scrollIntoView();
        (el as HTMLElement).focus?.({ preventScroll: true });
      };
      document.addEventListener("click", onAnchor);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({ start: 80, onUpdate: (s) => setScrolled(s.scroll() > 80) });
        if (reduce) return;

        // Hero
        gsap.fromTo("[data-hero-bg]", { scale: 1.18 }, { scale: 1, duration: 2.6, ease: "power2.out" });
        gsap.from("[data-hero-line]", { yPercent: 110, duration: 1.3, stagger: 0.12, ease: "power4.out", delay: 0.2 });
        gsap.from("[data-hero-fade]", { opacity: 0, y: 20, duration: 1, stagger: 0.1, delay: 0.9, ease: "power2.out" });
        gsap.to("[data-hero-bg]", { yPercent: 15, ease: "none", scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true } });

        // Generic reveals
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } });
        });
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
          gsap.from(el, { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" } });
        });
        gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
          gsap.from(el.children, { yPercent: 110, duration: 1.2, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } });
        });
        // Clip image reveals
        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          gsap.fromTo(el, { clipPath: "inset(18% 12% 18% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: true } });
          const img = el.querySelector("img");
          if (img) gsap.fromTo(img, { scale: 1.25, yPercent: -6 }, { scale: 1.05, yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        });
        // Figure rows: the hairline above each row draws itself in from the left
        gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((el) => {
          gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 1.8, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" } });
        });
        // Stats count
        gsap.utils.toArray<HTMLElement>("[data-count]:not([data-count=''])").forEach((el) => {
          const end = Number(el.dataset["count"]);
          const o = { v: 0 };
          gsap.to(o, { v: end, duration: 2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", once: true }, onUpdate: () => (el.textContent = String(Math.round(o.v))) });
        });
        // Project stack: previous card dims & recedes as next overlaps
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        cards.forEach((c, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(c.querySelector("[data-card-inner]"), { scale: 0.9, opacity: 0.35, ease: "none", scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true } });
        });
      }, root);

      cleanup = () => {
        ctx.revert();
        document.removeEventListener("click", onAnchor);
        gsap.ticker.remove(raf);
        lenis?.destroy();
      };
    })();
    return () => cleanup();
  }, []);

  return (
    <div ref={root} className="relative overflow-x-clip">
      <Cursor />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:p-3 focus:text-ivory-foreground">Skip to content</a>

      {/* Nav */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border bg-background/90 py-3 backdrop-blur-md" : "py-6"}`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
          <a href="#top" aria-label="SEA — home" className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-[5px] bg-white p-2">
              <img src={logo.url} alt="SEA — Studio for Eclectic Architecture" className="h-9 w-auto" />
            </span>
          </a>
          <nav aria-label="Primary" className="hidden gap-10 md:flex">
            {NAV.map(([l, h], i) => (
              <a key={h} href={h} className="group text-[0.7rem] uppercase tracking-[0.28em] text-foreground/80 transition-colors hover:text-foreground">
                <span className="mr-2 text-bronze">0{i + 1}</span>{l}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn-ghost hidden !px-5 !py-3 sm:inline-flex">Consult</a>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* HERO */}
        <section id="top" className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden">
          <img data-hero-bg src={hero} alt="Concrete and glass villa at dusk reflected in a still pool" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover will-change-transform" fetchPriority="high" />
          <div className="absolute inset-0 bg-overlay" />
          <div className="pointer-events-none absolute inset-0 grid-lines" />
          <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-24 md:px-12 md:pb-28">
            <p data-hero-fade className="label-num mb-8">Studio for Eclectic Architecture — Est. Studio</p>
            <h1 className="font-display text-[13vw] font-light leading-[0.9] tracking-tight md:text-[7.6vw]">
              <span className="mask-line"><span data-hero-line className="block">Architecture</span></span>
              <span className="mask-line"><span data-hero-line className="block italic text-outline">That Shapes</span></span>
              <span className="mask-line"><span data-hero-line className="block">How You Live</span></span>
            </h1>
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p data-hero-fade className="max-w-md text-sm leading-relaxed text-foreground/75 md:text-base">
                SEA is an architecture and interior studio crafting homes and buildings of quiet strength — composed from light, material and the way you live.
              </p>
              <div data-hero-fade className="flex flex-wrap gap-4">
                <a href="#projects" className="btn-solid">Explore Projects <span aria-hidden>→</span></a>
                <a href="#contact" className="btn-ghost">Book a Consultation</a>
              </div>
            </div>
          </div>
          <div data-hero-fade className="absolute bottom-8 right-6 hidden flex-col items-center gap-3 md:right-12 md:flex" aria-hidden>
            <span className="text-[0.6rem] uppercase tracking-[0.4em] [writing-mode:vertical-rl]">Scroll</span>
            <span className="scroll-hint relative h-14 w-px overflow-hidden bg-foreground/20" />
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" tabIndex={-1} className="panel-light relative bg-services-bg text-ink">
          <div className="pointer-events-none absolute inset-0 grid-lines" />
          <div className="relative mx-auto grid max-w-[1600px] gap-16 px-6 py-28 md:grid-cols-12 md:px-12 md:py-40">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-32">
                <p className="label-num">01 — Services</p>
                <h2 data-mask className="mt-6 font-display text-6xl font-light leading-[0.95] md:text-7xl lg:text-8xl">
                  <span className="mask-line"><span className="text-brand-gradient block">Six</span></span>
                  <span className="mask-line"><span className="text-brand-gradient-inv block italic">disciplines,</span></span>
                  <span className="mask-line"><span className="text-brand-gradient block">one hand.</span></span>
                </h2>
                <p data-reveal className="mt-8 max-w-sm text-ink">Every project is held by a single studio — so the building, the room and the garden speak one language.</p>
              </div>
            </div>
            <div className="space-y-28 md:col-span-7 md:space-y-40">
              {SERVICES.map((s, i) => (
                <article key={s.t}>
                  <div data-line className="mb-8 h-px w-full bg-border" />
                  <div className="flex items-baseline justify-between gap-6">
                    <h3 data-reveal className="font-display text-4xl font-light text-brand-teal md:text-5xl">
                      <span className="mr-4 font-sans text-xs tracking-[0.3em] text-brand-deep">0{i + 1}</span>{s.t}
                    </h3>
                  </div>
                  <div data-clip className="mt-8 aspect-[4/3] overflow-hidden">
                    <img src={s.img} alt={s.t} loading="lazy" width={1200} height={1408} className="h-full w-full object-cover" />
                  </div>
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <p data-reveal className="text-ink">{s.d}</p>
                    <a data-reveal href="#contact" className="group inline-flex items-center gap-3 self-start text-[0.7rem] uppercase tracking-[0.28em] md:justify-self-end">
                      Explore Service <span aria-hidden className="inline-block h-px w-8 bg-bronze transition-all duration-500 group-hover:w-14" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section id="stats" tabIndex={-1} className="panel-deep relative overflow-hidden bg-brand-deep">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
          <div className="bg-teal-glow pointer-events-none absolute -left-64 top-1/2 h-[44rem] w-[44rem] -translate-y-1/2" aria-hidden />
          <span className="reg-mark left-6 top-6 hidden md:block" aria-hidden />
          <span className="reg-mark right-6 top-6 hidden md:block" aria-hidden />
          <span className="reg-mark bottom-6 left-6 hidden md:block" aria-hidden />
          <span className="reg-mark bottom-6 right-6 hidden md:block" aria-hidden />
          <div className="relative mx-auto grid max-w-[1600px] gap-16 px-6 py-28 md:grid-cols-12 md:px-12 md:py-40">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-32">
                <p className="label-num">02 — The Studio</p>
                <h2 data-mask className="mt-6 font-display text-6xl font-light leading-[0.95] md:text-7xl lg:text-8xl">
                  <span className="mask-line"><span className="text-brand-gradient-pale block">The Studio,</span></span>
                  <span className="mask-line"><span className="text-brand-gradient-pale block italic">measured.</span></span>
                </h2>
                <p data-reveal className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  A working record of what the studio has made and how it works — light, material, time.
                </p>
                <div data-line className="mt-10 h-px w-24 bg-brand-teal" />
                <p data-reveal className="mt-6 max-w-xs text-xs leading-relaxed text-muted-foreground">
                  Figures shown are placeholders, to be replaced with the studio's verified numbers.
                </p>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="border-b border-border">
                {STATS.map((s, i) => (
                  <div key={s.l} data-reveal className="group relative border-t border-border py-9 md:py-11">
                    <span data-bar className="absolute inset-x-0 top-0 h-px origin-left bg-brand-teal" aria-hidden />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                      <div className="flex items-baseline gap-4">
                        <span className="font-sans text-[0.62rem] tracking-[0.3em] text-brand-teal">0{i + 1}</span>
                        <span className="font-display text-6xl font-light leading-[0.8] transition-colors duration-500 group-hover:text-teal-lift md:text-8xl">
                          <span data-count={s.v || undefined}>{s.v || "—"}</span>
                        </span>
                        {s.suffix ? <span className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-teal-lift">{s.suffix}</span> : null}
                      </div>
                      <p className="text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors duration-500 group-hover:text-services-bg">{s.l}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ticker-mask mt-14 overflow-hidden border-y border-border py-4">
                <div className="ticker-track">
                  {[0, 1].map((k) => (
                    <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
                      {SERVICES.map((s) => (
                        <span key={s.t} className="flex items-center whitespace-nowrap text-[0.66rem] uppercase tracking-[0.3em] text-teal-lift">
                          {s.t}
                          <span className="mx-8 text-brand-teal">◆</span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" tabIndex={-1} className="relative">
          <div className="pointer-events-none absolute inset-0 grid-lines" />
          <div className="relative mx-auto grid max-w-[1600px] gap-12 px-6 py-28 md:grid-cols-12 md:px-12 md:py-40">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-32">
                <p className="label-num">03 — Selected Work</p>
                <h2 data-mask className="mt-6 font-display text-6xl font-light leading-[0.95] md:text-7xl">
                  <span className="mask-line"><span className="block">Spaces With</span></span>
                  <span className="mask-line"><span className="block italic text-outline">a Lasting</span></span>
                  <span className="mask-line"><span className="block">Presence.</span></span>
                </h2>
                <p data-reveal className="mt-8 max-w-xs text-muted-foreground">Homes, pavilions and interiors designed to age with grace.</p>
                <a data-reveal href="#projects" className="btn-ghost mt-10">View All Projects</a>
              </div>
            </div>
            <div className="md:col-span-8">
              {PROJECTS.map((p, i) => (
                <article key={p.n} data-card className="md:sticky md:top-0 md:flex md:h-screen md:items-center">
                  <div data-card-inner className="w-full origin-top pb-16 md:pb-0">
                    <a href="#contact" data-cursor="view" aria-label={`View project ${p.n}`} className="group block">
                      <div data-clip className="relative aspect-[16/11] overflow-hidden">
                        <img src={p.img} alt={`${p.n}, ${p.loc}`} loading="lazy" width={1408} height={1008} className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.06]" />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                          <span className="text-[0.7rem] uppercase tracking-[0.3em]">View Project →</span>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 md:grid-cols-4">
                        <h3 className="font-display text-2xl md:text-3xl"><span className="mr-3 font-sans text-xs text-bronze">0{i + 1}</span>{p.n}</h3>
                        <p className="text-sm text-muted-foreground md:pt-2">{p.loc}</p>
                        <p className="text-sm text-muted-foreground md:pt-2">{p.cat}</p>
                        <p className="text-sm text-muted-foreground md:pt-2 md:text-right">{p.y}</p>
                      </div>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        {/* CONTACT */}
        <section id="contact" tabIndex={-1} className="bg-ivory text-ivory-foreground">
          <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-28 md:grid-cols-12 md:px-12 md:py-40">
            <div className="md:col-span-5">
              <p className="label-num !text-teal">05 — Consultation</p>
              <h2 data-mask className="mt-6 font-display text-6xl font-light leading-[0.95] md:text-7xl">
                <span className="mask-line"><span className="block">Let's Shape</span></span>
                <span className="mask-line"><span className="block italic text-bronze">Your Next</span></span>
                <span className="mask-line"><span className="block">Space.</span></span>
              </h2>
              <p data-reveal className="mt-8 max-w-sm text-ivory-foreground/70">Share a few details about your site and ambitions. We'll arrange an unhurried first conversation with a principal.</p>
              <dl data-reveal className="mt-12 space-y-6 text-sm">
                <div><dt className="label-num !text-teal">Studio</dt><dd className="mt-2">Address to be confirmed</dd></div>
                <div><dt className="label-num !text-teal">Email</dt><dd className="mt-2">studio@example.com</dd></div>
                <div><dt className="label-num !text-teal">Phone</dt><dd className="mt-2">+91 00000 00000</dd></div>
              </dl>
            </div>
            <div className="md:col-span-7">
              <ConsultationForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-10 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-12">
          <span className="inline-flex items-center rounded-[5px] bg-white p-1.5 opacity-90">
            <img src={logo.url} alt="SEA — Studio for Eclectic Architecture" className="h-8 w-auto" loading="lazy" />
          </span>
          <p>© {new Date().getFullYear()} Studio for Eclectic Architecture</p>
          <a href="#top" className="uppercase tracking-[0.28em] hover:text-foreground">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const n = TESTIMONIALS.length;
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % n), 7000);
    return () => clearInterval(id);
  }, [i, n]);
  return (
    <section aria-roledescription="carousel" aria-label="Client testimonials" className="relative overflow-hidden">
      <img src={testiBg} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-background/75" />
      <div className="relative mx-auto max-w-[1200px] px-6 py-32 md:px-12 md:py-44">
        <p className="label-num">04 — Voices</p>
        <div className="relative mt-10 grid min-h-[22rem] md:min-h-[18rem]" aria-live="polite">
          {TESTIMONIALS.map((t, k) => (
            <figure key={k} aria-hidden={k !== i} className={`col-start-1 row-start-1 transition-all duration-1000 ${k === i ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
              <blockquote className="font-display text-3xl font-light italic leading-snug md:text-5xl">“{t.q}”</blockquote>
              <figcaption className="mt-10 flex items-center gap-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-bronze font-display text-xl text-bronze">SC</span>
                <span>
                  <span className="block text-sm">{t.n}</span>
                  <span className="block text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">{t.r}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 flex items-center gap-6">
          <button aria-label="Previous testimonial" onClick={() => setI((i - 1 + n) % n)} className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:border-bronze">←</button>
          <button aria-label="Next testimonial" onClick={() => setI((i + 1) % n)} className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:border-bronze">→</button>
          <div className="ml-4 flex flex-1 gap-2" aria-hidden>
            {TESTIMONIALS.map((_, k) => (
              <span key={k} className="h-px flex-1 bg-border">
                <span className={`block h-full bg-bronze transition-all duration-700 ${k <= i ? "w-full" : "w-0"}`} />
              </span>
            ))}
          </div>
          <span className="text-xs tabular-nums text-muted-foreground">0{i + 1} / 0{n}</span>
        </div>
      </div>
    </section>
  );
}
