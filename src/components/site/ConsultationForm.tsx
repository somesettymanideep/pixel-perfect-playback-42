import { useState, type FormEvent } from "react";

type Errors = Partial<Record<string, string>>;
const required = ["name", "email", "projectType", "location", "details"];

export function validateConsultation(data: Record<string, string>): Errors {
  const e: Errors = {};
  for (const k of required) if (!data[k]?.trim()) e[k] = "This field is required.";
  if (data["email"] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data["email"])) e["email"] = "Please enter a valid email address.";
  if (data["phone"] && !/^[+\d][\d\s()-]{6,}$/.test(data["phone"])) e["phone"] = "Please enter a valid phone number.";
  if (data["details"] && data["details"].trim().length > 0 && data["details"].trim().length < 20)
    e["details"] = "Tell us a little more — at least 20 characters.";
  return e;
}


function F({ name, label, type = "text", optional, errors }: { name: string; label: string; type?: string; optional?: boolean; errors: Errors }) {
  return (
    <div>
      <label htmlFor={name} className="text-[0.68rem] uppercase tracking-[0.28em] text-ivory-foreground/60">
        {label} {optional && <span className="normal-case tracking-normal">(optional)</span>}
      </label>
      <input id={name} name={name} type={type} className="field" aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-err` : undefined} />
      {errors[name] && <p id={`${name}-err`} className="mt-2 text-xs text-destructive">{errors[name]}</p>}
    </div>
  );
}


export function ConsultationForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.currentTarget)) as Record<string, string>;
    const e = validateConsultation(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = ev.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  }

  if (status === "done")
    return (
      <div role="status" className="flex min-h-[28rem] flex-col justify-center border-t border-ivory-foreground/20 pt-10">
        <span className="label-num">Received</span>
        <h3 className="mt-6 font-display text-5xl font-light">Thank you.</h3>
        <p className="mt-4 max-w-md text-ivory-foreground/70">
          Your request is with our studio. A principal architect will be in touch within two working days.
        </p>
      </div>
    );

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
      <F errors={errors} name="name" label="Name" />
      <F errors={errors} name="email" label="Email" type="email" />
      <F errors={errors} name="phone" label="Phone" type="tel" optional />
      <div>
        <label htmlFor="projectType" className="text-[0.68rem] uppercase tracking-[0.28em] text-ivory-foreground/60">Project type</label>
        <select id="projectType" name="projectType" defaultValue="" className="field" aria-invalid={!!errors.projectType} aria-describedby={errors.projectType ? "projectType-err" : undefined}>
          <option value="" disabled>Select</option>
          <option>Architecture Design</option>
          <option>Interior Design</option>
          <option>Landscape Design</option>
          <option>Turnkey Execution</option>
        </select>
        {errors.projectType && <p id="projectType-err" className="mt-2 text-xs text-destructive">{errors.projectType}</p>}
      </div>
      <F errors={errors} name="location" label="Project location" />
      <div>
        <label htmlFor="budget" className="text-[0.68rem] uppercase tracking-[0.28em] text-ivory-foreground/60">Estimated budget <span className="normal-case tracking-normal">(optional)</span></label>
        <select id="budget" name="budget" defaultValue="" className="field">
          <option value="">Prefer not to say</option>
          <option>Under ₹50 lakh</option>
          <option>₹50 lakh – ₹1 crore</option>
          <option>₹1 – 3 crore</option>
          <option>Above ₹3 crore</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="details" className="text-[0.68rem] uppercase tracking-[0.28em] text-ivory-foreground/60">Project details</label>
        <textarea id="details" name="details" rows={4} className="field resize-none" aria-invalid={!!errors.details} aria-describedby={errors.details ? "details-err" : undefined} />
        {errors.details && <p id="details-err" className="mt-2 text-xs text-destructive">{errors.details}</p>}
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-solid disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Request a Consultation"} <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}
