import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import architecture from "@/assets/s-arch.jpg";
import interior from "@/assets/s-interior.jpg";

export function AboutSection() {
  return (
    <section id="about" tabIndex={-1} aria-labelledby="about-heading" className="panel-light relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <div data-reveal className="mb-6 flex items-center gap-4">
            <span aria-hidden className="h-px w-12 bg-brand-teal" />
            <p className="text-sm uppercase text-brand-teal">About Us</p>
          </div>
          <h2 id="about-heading" data-reveal className="font-display text-[4.25rem] font-light leading-[1.02] whitespace-nowrap text-brand-deep sm:text-[6.5rem] md:text-[8rem] lg:text-[5.5rem] xl:text-[7.25rem] 2xl:text-[9rem]">
            About <span className="text-brand-teal">SEA</span>
          </h2>
          <p data-reveal className="mt-6 max-w-xl font-display text-3xl font-light italic leading-snug text-brand-deep sm:text-4xl lg:text-[2.75rem]">
            Studio for Eclectic <span className="text-brand-teal">Architecture.</span>
          </p>
          <p data-reveal className="mt-6 max-w-lg text-sm leading-relaxed text-ink md:text-base">
            We bring architecture, interiors and landscape together to shape spaces around the way you live.
          </p>
          <p data-reveal className="mt-4 max-w-lg text-sm leading-relaxed text-ink md:text-base">
            From the first idea to the finest detail, our approach connects light, material and place — with a single vision carried through every discipline.
          </p>
          <div data-reveal className="mt-9">
            <Button asChild size="lg" className="h-12 rounded-sm px-7 text-xs uppercase">
              <a href="#services">Our Expertise <ArrowUpRight aria-hidden /></a>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-2xl pb-10 pr-10 sm:pb-12 sm:pr-20 lg:pr-16">
          <span aria-hidden className="pointer-events-none absolute bottom-5 right-4 top-8 w-2/3 border border-brand-teal/30 sm:right-8" />
          <div data-clip className="relative aspect-[5/4] overflow-hidden rounded-md">
            <img src={architecture} alt="Contemporary architecture with sculptural forms and landscaped surroundings" width={1200} height={1408} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div data-reveal className="absolute bottom-0 right-0 w-[46%] overflow-hidden rounded-md border-[5px] border-paper bg-paper">
            <img src={interior} alt="A carefully composed contemporary interior with natural materials" width={1200} height={1408} loading="lazy" className="aspect-square w-full object-cover" />
          </div>
        </div>
      </div>
      <div className="mx-6 border-t border-border md:mx-12" />
    </section>
  );
}