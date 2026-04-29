import { Reveal } from "@/components/Reveal";
import { Layers, Route, Bell, CalendarSync } from "lucide-react";

const items = [
  { icon: Layers, title: "One Platform for 3 Groups", desc: "Children, teenagers, and parents — together in one ecosystem." },
  { icon: Route, title: "Career Guidance & Roadmaps", desc: "Step-by-step paths to every major career, powered by AI." },
  { icon: Bell, title: "Smart Reminder System", desc: "Friendly nudges keep daily goals on track — no overwhelm." },
  { icon: CalendarSync, title: "Smart Scheduling", desc: "Synced across the whole family for harmony, not friction." },
];

export function Advantage() {
  return (
    <section id="advantage" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">The Advantage</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground text-balance">
              Why <span className="text-primary">Next Bridge?</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} delay={i * 100}>
                <div className="group relative h-full overflow-hidden bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-card transition-all">
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-colors" />
                  <div className="relative flex items-start gap-5">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary text-primary-foreground grid place-items-center shadow-soft">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{it.title}</h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">{it.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
