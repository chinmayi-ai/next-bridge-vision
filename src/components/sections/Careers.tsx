import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Stethoscope, Cog, Scale, Palette, Landmark, ArrowRight } from "lucide-react";

const careers = [
  { key: "doctor", label: "Doctor", icon: Stethoscope },
  { key: "engineer", label: "Engineer", icon: Cog },
  { key: "lawyer", label: "Lawyer", icon: Scale },
  { key: "designer", label: "Designer", icon: Palette },
  { key: "govt", label: "Government Job", icon: Landmark },
];

const roadmap = [
  { step: "Step 1", title: "High School Preparation", desc: "Focus on Biology, Chemistry & Physics. Build study habits early." },
  { step: "Step 2", title: "Undergraduate Degree", desc: "Pre-med or related Bachelor's with strong GPA and lab experience." },
  { step: "Step 3", title: "Medical School", desc: "4 years of medical training — entrance exam, clinical rotations." },
  { step: "Step 4", title: "Residency Training", desc: "3–7 years specializing in your chosen field of medicine." },
  { step: "Step 5", title: "Licensure & Practice", desc: "Pass licensing exams and begin your professional medical career." },
];

export function Careers() {
  const [active, setActive] = useState("doctor");

  return (
    <section id="careers" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">Teen Hub</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground text-balance">
              Explore your <span className="text-primary">future career</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Pick a path. Get a personalized, step-by-step roadmap built by AI.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {careers.map((c) => {
              const Icon = c.icon;
              const isActive = active === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className={`group p-5 rounded-2xl border transition-all text-left ${
                    isActive
                      ? "border-accent bg-accent-soft shadow-card -translate-y-1"
                      : "border-border bg-card hover:border-accent/40 hover:-translate-y-1 shadow-soft"
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl grid place-items-center mb-3 ${isActive ? "bg-accent text-accent-foreground" : "bg-secondary text-primary"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-foreground">{c.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">View roadmap</div>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-14 bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-card">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
                Demo Roadmap
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">Becoming a Doctor</h3>
            </div>

            <ol className="relative space-y-4">
              <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-accent via-primary-glow to-primary hidden sm:block" />
              {roadmap.map((r, i) => (
                <li
                  key={r.step}
                  className="relative sm:pl-14 p-5 sm:p-6 rounded-2xl bg-gradient-soft border border-border hover:border-accent/40 transition-colors"
                >
                  <span className="hidden sm:grid absolute left-0 top-5 w-9 h-9 rounded-full bg-gradient-accent text-primary font-bold place-items-center shadow-glow">
                    {i + 1}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
                    {r.step}
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="mt-1 text-lg font-bold text-foreground">{r.title}</div>
                  <p className="mt-1 text-muted-foreground">{r.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
