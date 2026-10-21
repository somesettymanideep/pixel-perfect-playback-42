import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Project = { n: string; loc?: string; cat: string; y?: string; img: string };

export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const updateActive = (section: HTMLElement, index: number) => {
    const counter = section.querySelector("[data-project-current]");
    if (counter) counter.textContent = String(index + 1).padStart(2, "0");
    section.querySelectorAll("[data-project-dot]").forEach((dot, current) => dot.setAttribute("aria-current", String(current === index)));
  };
  const goTo = (index: number) => {
    const section = document.getElementById("projects");
    const stage = section?.querySelector<HTMLElement>("[data-project-stage]");
    const viewport = section?.querySelector<HTMLElement>("[data-project-viewport]");
    const card = section?.querySelectorAll<HTMLElement>("[data-project-card]")[index];
    if (!section || !stage || !viewport || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      viewport.scrollTo({ left: card.offsetLeft - 24, behavior: "auto" });
      updateActive(section, index);
      return;
    }
    const travel = section.offsetHeight - stage.offsetHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.dispatchEvent(new CustomEvent("sea:project-scroll", { detail: top + travel * index / Math.max(1, projects.length - 1) }));
  };

  return (
    <section id="projects" tabIndex={-1} aria-labelledby="projects-heading" className="project-gallery panel-light relative bg-paper">
      <div data-project-stage className="project-stage">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
        <div className="relative mx-auto flex w-full max-w-[1600px] items-end justify-between gap-6 px-6 pb-8 md:px-12 md:pb-10">
          <div>
            <p className="mb-3 font-display text-3xl font-light uppercase text-brand-teal sm:text-4xl xl:text-[3rem]">Portfolio</p>
            <h2 id="projects-heading" className="font-display text-[1.75rem] font-light leading-[1.3]"><span className="block text-brand-gradient">Our Projects</span></h2>
          </div>
          <span aria-hidden className="font-display text-3xl leading-none text-brand-deep/18 sm:text-4xl xl:text-[3rem]">.03</span>
        </div>
        <div data-project-viewport className="project-viewport relative" onScroll={(event) => {
          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          const viewport = event.currentTarget;
          const section = viewport.closest<HTMLElement>("#projects");
          if (!section) return;
          const distance = viewport.scrollWidth - viewport.clientWidth;
          updateActive(section, Math.round(viewport.scrollLeft / Math.max(1, distance) * (projects.length - 1)));
        }}>
          <div data-project-track className="project-track">
            {projects.map((project, index) => (
              <article key={project.n} data-project-card className="project-item">
                <a href="#contact" data-cursor="view" aria-label={`Enquire about ${project.n}`} className="group block focus-visible:outline-offset-[-4px]">
                  <div data-project-clip className="project-image overflow-hidden">
                    <img data-project-image src={project.img} alt={project.loc ? `${project.n}, ${project.loc}` : project.n} loading="lazy" width={1408} height={1008} className="h-full w-full object-cover" />
                  </div>
                  <div data-project-caption className="project-caption panel-light relative mx-4 -mt-12 flex items-center justify-between gap-4 bg-services-bg px-5 py-4 text-brand-teal md:mx-6 md:px-6">
                    <div className="min-w-0">
                      <p className="mb-2 text-xs uppercase text-brand-teal">{project.y ? `${project.cat} — ${project.y}` : project.cat}</p>
                      <h3 className="font-display text-2xl leading-tight text-brand-teal md:text-3xl xl:text-4xl">{project.n}</h3>
                      {project.loc ? <p className="mt-1 text-sm text-brand-teal">{project.loc}</p> : null}
                    </div>
                    <ArrowUpRight aria-hidden className="size-5 shrink-0 text-brand-teal transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <span className="sr-only">Project {index + 1} of {projects.length}</span>
                </a>
              </article>
            ))}
          </div>
        </div>
        <div className="relative mx-auto mt-6 flex w-full max-w-[1600px] items-center justify-between gap-6 px-6 md:mt-8 md:px-12">
          <div className="flex items-center gap-2" aria-label="Choose project">
            {projects.map((project, index) => (
              <Button key={project.n} variant="ghost" size="icon" className="project-dot size-8 rounded-full" aria-label={`Show ${project.n}`} aria-current={index === 0 ? "true" : "false"} data-project-dot onClick={() => goTo(index)}>
                <span className="size-1.5 rounded-full bg-current" />
              </Button>
            ))}
          </div>
          <div className="hidden h-px max-w-80 flex-1 overflow-hidden bg-brand-deep/22 sm:block" aria-hidden>
            <span data-project-progress className="block h-full origin-left bg-brand-teal" />
          </div>
          <div className="flex items-center gap-3">
            <span className="mr-2 text-xs tabular-nums text-muted-foreground"><span data-project-current>01</span> / {String(projects.length).padStart(2, "0")}</span>
            <Button variant="ghost" size="icon" title="Previous project" aria-label="Previous project" className="rounded-full border border-border text-brand-deep" onClick={() => { const active = Number(document.querySelector("[data-project-current]")?.textContent || 1); goTo(Math.max(0, active - 2)); }}><ArrowLeft /></Button>
            <Button variant="ghost" size="icon" title="Next project" aria-label="Next project" className="rounded-full border border-border text-brand-deep" onClick={() => { const active = Number(document.querySelector("[data-project-current]")?.textContent || 1); goTo(Math.min(projects.length - 1, active)); }}><ArrowRight /></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
