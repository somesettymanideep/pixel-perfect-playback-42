import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Cursor } from "@/components/site/Cursor";
import { ConsultationSection } from "@/components/site/ConsultationSection";
import { ProjectsGallery } from "@/components/site/ProjectsGallery";
import { AboutSection } from "@/components/site/AboutSection";
import { Footer } from "@/components/site/Footer";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import logo from "@/assets/sea-logo.png.asset.json";
import hero from "@/assets/hero.jpg";
import sArch from "@/assets/s-arch.jpg";
import sInterior from "@/assets/s-interior.jpg";
import sLandscape from "@/assets/s-landscape.jpg";
import sStructural from "@/assets/s-structural.jpg";
import sProjectManagement from "@/assets/s-project-management.webp.asset.json";
import sBim from "@/assets/s-bim.jpg";
import pGangadhar from "@/assets/p-gangadhar.webp.asset.json";
import pSindhura from "@/assets/p-sindhura.webp.asset.json";
import pMallikarjun from "@/assets/p-mallikarjun.webp.asset.json";
import pGravity from "@/assets/p-gravity.webp.asset.json";
import pChandramouli from "@/assets/p-chandramouli.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEA — Architecture That Shapes How You Live" },
      { name: "description", content: "Studio for Eclectic Architecture: architecture, interiors, landscape and turnkey execution for spaces with lasting presence." },
      { property: "og:title", content: "SEA — Studio for Eclectic Architecture" },
      { property: "og:description", content: "Architecture, interiors and landscapes crafted with lasting presence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

// The studio's figures, as supplied by the studio.
const STATS = [
  { v: 350, suffix: "+", l: "Projects Completed" },
  { v: 10000, suffix: "sq ft", l: "Area Designed" },
  { v: 16, suffix: "+", l: "Years of Experience" },
  { v: 100, suffix: "%", l: "Client Satisfaction" },
];

const PROJECTS = [
  { n: "Gangadhar Estate", loc: "Vijayawada, Andhra Pradesh", cat: "Estate", img: pGangadhar.url },
  { n: "Krishna Sindhura Hospital", loc: "Hyderabad, Telangana", cat: "Healthcare", img: pSindhura.url },
  { n: "Mallikarjun Reddy", loc: "Hyderabad, Telangana", cat: "Interior", img: pMallikarjun.url },
  { n: "Gravity Central", loc: "Hyderabad, Telangana", cat: "Interior", img: pGravity.url },
  { n: "Chandramouli Residence", cat: "Landscape", img: pChandramouli.url },
];

// Sample testimonials — replace with real client feedback.
const TESTIMONIALS = [
  { q: "They listened to how we wanted to live before drawing a single line. The house feels inevitable now.", n: "Sample Client", r: "Private Residence" },
  { q: "Every material, every junction was considered. It is the calmest place we have ever lived.", n: "Sample Client", r: "Penthouse Interior" },
  { q: "From design to handover they carried the whole project. We simply moved in.", n: "Sample Client", r: "Turnkey Villa" },
  { q: "The courtyard changed how our family spends an evening. We did not know we needed it until we had it.", n: "Sample Client", r: "Garden Residence" },
  { q: "They held the budget and the vision at the same time. Nothing on site felt improvised.", n: "Sample Client", r: "Boutique Hotel" },
  { q: "Drawings, models and site visits all told the same story. Handover felt like a formality.", n: "Sample Client", r: "Skyline Tower" },
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
        const href = a.getAttribute("href");
        if (!href) return;
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
        else el.scrollIntoView();
        (el as HTMLElement).focus?.({ preventScroll: true });
      };
      document.addEventListener("click", onAnchor);
      const onProjectScroll = (event: Event) => {
        const top = (event as CustomEvent<number>).detail;
        if (lenis) lenis.scrollTo(top, { duration: 1.1 });
        else window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      };
      window.addEventListener("sea:project-scroll", onProjectScroll);

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
          gsap.to(o, { v: end, duration: 2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", once: true }, onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString("en-IN")) });
        });
        // A sticky stage keeps the gallery steady while vertical scroll moves the track.
        const section = document.getElementById("projects");
        const track = section?.querySelector<HTMLElement>("[data-project-track]");
        if (section && track) {
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const measure = () => section.style.setProperty("--project-travel", `${distance()}px`);
          measure();
          const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-project-card]"));
          const dots = Array.from(section.querySelectorAll<HTMLElement>("[data-project-dot]"));
          const counter = section.querySelector("[data-project-current]");
          const progress = section.querySelector("[data-project-progress]");
          const gallery = gsap.timeline({ scrollTrigger: {
            trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: 0.6,
            invalidateOnRefresh: true, onRefreshInit: measure,
            onUpdate: (self) => {
              const active = Math.round(self.progress * (cards.length - 1));
              if (counter) counter.textContent = String(active + 1).padStart(2, "0");
              dots.forEach((dot, index) => dot.setAttribute("aria-current", String(index === active)));
            },
          } });
          dots[0]?.setAttribute("aria-current", "true");
          gallery.to(track, { x: () => -distance(), duration: 1, ease: "none" }, 0);
          if (progress) gallery.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" }, 0);
          cards.forEach((card, index) => {
            const clip = card.querySelector("[data-project-clip]");
            const image = card.querySelector("[data-project-image]");
            if (!clip || !image) return;
            if (index === 0) {
              gsap.fromTo(clip, { clipPath: "inset(12% 10% 12% 10%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: section, start: "top 85%", end: "top top", scrub: true } });
            } else {
              const entry = Math.max(0, (card.offsetLeft - window.innerWidth * 0.85) / Math.max(1, distance()));
              gallery.fromTo(clip, { clipPath: "inset(10% 16% 10% 16%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: Math.min(0.35, 1 - entry), ease: "none" }, entry);
            }
            gallery.fromTo(image, { scale: 1.12, xPercent: -3 }, { scale: 1, xPercent: 3, duration: 1, ease: "none" }, 0);
          });
          ScrollTrigger.refresh();
        }
      }, root);

      cleanup = () => {
        ctx.revert();
        document.removeEventListener("click", onAnchor);
        window.removeEventListener("sea:project-scroll", onProjectScroll);
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
            <p data-hero-fade className="label-num mb-8 !text-teal-lift">Studio for Eclectic Architecture — Est. Studio</p>
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
        <AboutSection />

        <section id="services" tabIndex={-1} className="panel-light relative bg-services-bg text-ink">
          <div className="pointer-events-none absolute inset-0 grid-lines" />
          <div className="relative mx-auto grid max-w-[1600px] gap-16 px-6 py-28 md:grid-cols-12 md:px-12 md:py-40">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-32">
                <p className="label-num !text-base">01 — Services</p>
                <h2 data-mask className="mt-6 font-display text-6xl font-light leading-[0.95] lg:text-7xl xl:text-[5rem] 2xl:text-[6rem]">
                  <span className="mask-line"><span className="text-brand-gradient block">Six</span></span>
                  <span className="mask-line"><span className="text-brand-gradient-inv block italic">disciplines,</span></span>
                  <span className="mask-line"><span className="text-brand-gradient block">one hand.</span></span>
                </h2>
                <p data-reveal className="mt-8 max-w-md text-base leading-relaxed text-ink md:text-lg">Every project is held by a single studio — so the building, the room and the garden speak one language.</p>
              </div>
            </div>
            <div className="space-y-28 md:col-span-7 md:space-y-40">
              {SERVICES.map((s, i) => (
                <article key={s.t}>
                  <div data-line className="mb-8 h-px w-full bg-border" />
                  <div className="flex items-baseline justify-between gap-6">
                    <h3 data-reveal className="font-display text-5xl font-light text-brand-teal sm:text-[3.25rem] lg:text-[3.9rem] xl:text-[4.4rem] 2xl:text-7xl">
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
        <section id="stats" tabIndex={-1} className="panel-light relative overflow-hidden bg-services-bg text-ink">
          <div className="grid-lines pointer-events-none absolute inset-0" />
          <div className="bg-teal-glow pointer-events-none absolute -left-64 top-1/2 h-[44rem] w-[44rem] -translate-y-1/2 opacity-30" aria-hidden />
          <span className="reg-mark left-6 top-6 hidden md:block" aria-hidden />
          <span className="reg-mark right-6 top-6 hidden md:block" aria-hidden />
          <span className="reg-mark bottom-6 left-6 hidden md:block" aria-hidden />
          <span className="reg-mark bottom-6 right-6 hidden md:block" aria-hidden />
          <div className="relative mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="label-num !text-sm">02 — The Studio</p>
                <h2 data-mask className="mt-6 font-display text-7xl font-light leading-[0.95] lg:text-8xl xl:text-[6.3rem] 2xl:text-[7.2rem]">
                  <span className="mask-line"><span className="text-brand-gradient block">The Studio,</span></span>
                  <span className="mask-line"><span className="text-brand-gradient-inv block italic">measured.</span></span>
                </h2>
              </div>
              <div className="max-w-md lg:pb-5 lg:text-right">
                <p data-reveal className="text-sm leading-relaxed text-muted-foreground">
                  A working record of what the studio has made and how it works — light, material, time.
                </p>
                <div data-line className="mt-6 h-px w-24 bg-brand-teal lg:ml-auto" />
              </div>
            </div>
            <div className="mt-20 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <figure key={s.l} data-reveal className="group relative bg-paper p-8 md:p-10">
                  <span className="font-sans text-[0.62rem] tracking-[0.3em] text-brand-teal">0{i + 1}</span>
                  <div className="mt-7 flex flex-wrap items-baseline gap-x-3">
                    <span className="stat-figure font-display font-light leading-[0.8] whitespace-nowrap text-brand-teal transition-colors duration-500 group-hover:text-brand-deep">
                      <span data-count={s.v}>{s.v.toLocaleString("en-IN")}</span>
                    </span>
                    {s.suffix ? <span className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-brand-deep">{s.suffix}</span> : null}
                  </div>
                  <figcaption className="mt-7 text-[0.68rem] uppercase tracking-[0.3em] text-ink transition-colors duration-500 group-hover:text-brand-teal">
                    {s.l}
                  </figcaption>
                  <span data-bar className="absolute bottom-0 left-0 h-px w-full origin-left bg-brand-teal" aria-hidden />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <ProjectsGallery projects={PROJECTS} />

        <TestimonialsSection testimonials={TESTIMONIALS} />

        {/* CONTACT */}
        <ConsultationSection />
      </main>

      <Footer />
    </div>
  );
}
