import { Reveal } from "@/components/Reveal";

const items = [
  { emoji: "🧒", title: "Children", desc: "Easily distracted and need fun, structured learning that keeps them engaged." },
  { emoji: "🎓", title: "Teenagers", desc: "Anxious about the future and need clear, career-focused guidance." },
  { emoji: "👩‍👦", title: "Parents", desc: "Left behind by technology and need supportive tools to guide their kids." },
];

export function Problem() {
  return (
    <section id="problem" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">The Problem</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground text-balance">
              Education is fragmented. <span className="text-primary">We fix that.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 120}>
              <div className="group h-full bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-accent-soft grid place-items-center text-3xl">
                  {it.emoji}
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">{it.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-14 text-center text-lg lg:text-xl text-foreground font-medium max-w-3xl mx-auto text-balance">
            Current platforms fail to integrate all three.{" "}
            <span className="text-primary font-bold">Next Bridge doesn't.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
