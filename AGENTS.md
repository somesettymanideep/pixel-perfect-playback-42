<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Scroll choreography: one Lenis instance driven by the GSAP ticker plus ScrollTrigger, set up in the home route; pins use CSS sticky to avoid jitter.
- Panel treatments: pale sections use `.panel-light`, navy sections use `.panel-deep`; both retint the shared border/accent tokens, so section markup uses semantic color classes and never hardcodes brand hexes.
- Projects gallery: vertical scroll drives a horizontal track inside a CSS-sticky stage; calculate travel from actual track dimensions and provide native horizontal browsing for reduced motion.
- About section: keep the homepage studio introduction in a dedicated presentation component using the home route's shared reveal hooks, so the existing scroll lifecycle remains centralized.
- Footer: keep footer presentation in its own component, use existing section anchors, and leave unavailable external or legal destinations disabled rather than inventing URLs.
- Consultation: keep the FAQ and form split in a dedicated presentation component using shared home reveal hooks; preserve submission behavior when changing its layout.
