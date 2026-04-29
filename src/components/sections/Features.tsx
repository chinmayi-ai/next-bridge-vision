import { Reveal } from "@/components/Reveal";
import { Zap, BarChart3, BellRing } from "lucide-react";

const features = [
  {
    icon: Zap,
    emoji: "⚡",
    title: "Smart Scheduling",
    desc: "Adaptive algorithms adjust pace and difficulty in real time, so every learner moves at their best speed.",
  },
  {
    icon: BarChart3,
    emoji: "📊",
    title: "Progress Tracking",
    desc: "Real-time analytics, mastery checkpoints, and offline-ready content — see growth at a glance.",
  },
  {
    icon: BellRing,
    emoji: "🔔",
    title: "Smart Reminder System",
    desc: "Auto push reminders when daily goals remain incomplete by evening. Build accountability gently.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">Core Features</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground text-balance">
              Smart, adaptive <span className="text-primary">& accessible</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 120}>
                <div className="group h-full bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-accent grid place-items-center shadow-glow">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-3xl">{f.emoji}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-foreground">{f.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
