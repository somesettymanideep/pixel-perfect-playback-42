import { Facebook, Instagram, Linkedin, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/sea-logo.png.asset.json";

const explore = [
  ["Home", "#top"], ["About", "#about"], ["Projects", "#projects"],
  ["Services", "#services"], ["Testimonials", "#testimonials"], ["Contact", "#contact"],
] as const;
const services = ["Architectural Design", "Interior Design", "Landscape Design", "Structural Design", "Project Management", "BIM Services"];
const offices = [
  { name: "Corporate Office", address: "#1215, 11th Floor, Vasavi MPM Grand, Yellareddy Guda, Ameerpet, Hyderabad, Telangana - 500 073" },
  { name: "Branch Office", address: "Flat No: 101, Sri Sai Nilayam, Chandramoulipuram, ADJ. HDFC Bank, BENZ Circle, Vijayawada, Andhra Pradesh 520 010" },
  { name: "Bangalore", address: "NO 40-14-5/2, Flat No - 101, Sri Sai Ram Nilayam, Chandramoulipuram, Adj Hdfc Bank, Benz Circle, Vijayawada -520010" },
];

export function Footer() {
  return (
    <footer className="panel-deep bg-brand-deep text-services-bg" aria-label="Studio footer">
      <div className="mx-auto max-w-[1600px] px-6 pt-12 md:px-12 md:pt-14">
        <div className="grid gap-x-12 gap-y-10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_0.95fr_1.45fr] lg:gap-x-14 lg:pb-16">
          <div>
            <a href="#top" aria-label="SEA home" className="inline-flex rounded-[5px] bg-paper px-3 py-2">
              <img src={logo.url} alt="SEA — Studio for Eclectic Architecture" width={92} height={43} className="h-9 w-auto" loading="lazy" />
            </a>
            <h2 className="mt-6 max-w-56 text-sm font-semibold uppercase leading-relaxed text-teal-lift">Studio for Eclectic Architecture</h2>
            <p className="mt-3 max-w-64 text-xs leading-relaxed text-services-bg/80">Architecture, interiors, landscapes and technical expertise brought together to create thoughtfully designed spaces.</p>
            <div className="mt-5 flex gap-2" aria-label="Social media">
              {[{ name: "Instagram", icon: Instagram }, { name: "Pinterest", icon: null }, { name: "LinkedIn", icon: Linkedin }, { name: "Facebook", icon: Facebook }].map(({ name, icon: Icon }) => (
                <Button key={name} size="icon" disabled title={`${name} — profile link not yet supplied`} aria-label={`${name} (profile link unavailable)`} className="h-8 w-8 rounded-none bg-brand-teal text-services-bg disabled:opacity-80">
                  {Icon ? <Icon aria-hidden /> : <span aria-hidden className="font-display text-xl font-bold italic">p</span>}
                </Button>
              ))}
            </div>
          </div>
          <nav aria-label="Footer explore">
            <h2 className="mb-5 font-display text-sm font-semibold uppercase text-teal-lift">Explore</h2>
            <ul className="space-y-3 text-sm text-services-bg/85">
              {explore.map(([label, href]) => <li key={label}><a href={href} className="inline-block py-0.5 transition-colors hover:text-services-bg">{label}</a></li>)}
            </ul>
          </nav>
          <nav aria-label="Footer services">
            <h2 className="mb-5 font-display text-sm font-semibold uppercase text-teal-lift">Services</h2>
            <ul className="space-y-3 text-sm text-services-bg/85">
              {services.map(service => <li key={service}><a href="#services" className="inline-block py-0.5 transition-colors hover:text-services-bg">{service}</a></li>)}
            </ul>
          </nav>
          <div>
            <h2 className="mb-5 font-display text-sm font-semibold uppercase text-teal-lift">Contact</h2>
            <dl className="space-y-4">
              {offices.map(office => <div key={office.name}>
                <dt className="text-[0.625rem] font-semibold uppercase text-teal-lift">{office.name}</dt>
                <dd className="mt-1 flex gap-1.5 text-[0.6875rem] leading-relaxed text-services-bg/80"><MapPin aria-hidden className="mt-0.5 h-3 w-3 shrink-0 text-teal-lift" /><span>{office.address}</span></dd>
              </div>)}
              <div className="border-t border-border pt-3">
                <dt className="text-[0.625rem] font-semibold uppercase text-teal-lift">Phone</dt>
                <dd className="mt-1"><a href="tel:+919000299600" className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold hover:text-teal-lift"><Phone aria-hidden className="h-3 w-3" />+91 9000299600</a></dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-border py-6 text-[0.625rem] text-services-bg/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SEA – Studio for Eclectic Architecture. All rights reserved.</p>
          <div className="flex gap-5">
            <Button variant="link" disabled title="Privacy policy not yet supplied" className="h-auto p-0 text-[0.625rem] text-services-bg/80 disabled:opacity-80">Privacy Policy</Button>
            <Button variant="link" disabled title="Terms not yet supplied" className="h-auto p-0 text-[0.625rem] text-services-bg/80 disabled:opacity-80">Terms</Button>
          </div>
        </div>
      </div>
    </footer>
  );
}