import { Reveal } from "@/components/Reveal";
import { Gamepad2, Compass, BookHeart, Check } from "lucide-react";

const zones = [
  {
    icon: Gamepad2,
    title: "KidsZone",
    tag: "Ages 5–12",
    desc: "Where curiosity meets play.",
    bullets: ["Gamified lessons", "Distraction-free schedules", "Riddles & puzzles", "Real-time feedback"],
    accent: "from-accent/90 to-accent/60",
  },
  {
    icon: Compass,
    title: "Teen Hub",
    tag: "Ages 13–19",
    desc: "Career-ready, confidence-built.",
    bullets: ["Career roadmaps", "Live industry trends", "Mentorship opportunities", "Skill tracking"],
    accent: "from-primary to-primary-glow",
  },
  {
    icon: BookHeart,
    title: "Parent Portal",
    tag: "For Families",
    desc: "Stay informed. Guide together.",
    bullets: ["Cultural knowledge", "Daily affairs", "Tools to support kids", "Family progress view"],
    accent: "from-primary-glow to-accent",
  },
];

export function Zones() {
  return (
    <section id="zones" className="py-24 lg:py-32 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">Platform Zones</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground text-balance">
              Three zones. <span className="text-primary">One family.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Each zone adapts to its audience while staying connected to the others.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {zones.map((z, i) => {
            const Icon = z.icon;
            return (
              <Reveal key={z.title} delay={i * 120}>
                <div className="group relative h-full bg-card border border-border rounded-3xl overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
                  <div className={`h-32 bg-gradient-to-br ${z.accent} relative`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />
                    <div className="absolute -bottom-8 left-7 w-16 h-16 rounded-2xl bg-card border border-border grid place-items-center shadow-card">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-semibold">
                      {z.tag}
                    </span>
                  </div>
                  <div className="p-7 pt-12">
                    <h3 className="text-2xl font-bold text-foreground">{z.title}</h3>
                    <p className="mt-1 text-muted-foreground">{z.desc}</p>
                    <ul className="mt-6 space-y-3">
                      {z.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-accent-soft grid place-items-center shrink-0">
                            <Check className="w-3 h-3 text-accent" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
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
