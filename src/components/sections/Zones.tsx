import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Gamepad2, Compass, BookHeart, Check, ArrowRight, X, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const zones = [
  {
    key: "kids" as const,
    icon: Gamepad2,
    title: "KidsZone",
    tag: "Ages 5–12",
    desc: "Where curiosity meets play.",
    bullets: ["Gamified lessons", "Distraction-free schedules", "Riddles & puzzles", "Real-time feedback"],
    accent: "from-accent/90 to-accent/60",
  },
  {
    key: "teen" as const,
    icon: Compass,
    title: "Teen Hub",
    tag: "Ages 13–19",
    desc: "Career-ready, confidence-built.",
    bullets: ["Career roadmaps", "Live industry trends", "Mentorship opportunities", "Skill tracking"],
    accent: "from-primary to-primary-glow",
  },
  {
    key: "parent" as const,
    icon: BookHeart,
    title: "Parent Portal",
    tag: "For Families",
    desc: "Stay informed. Guide together.",
    bullets: ["Cultural knowledge", "Daily affairs", "Tools to support kids", "Family progress view"],
    accent: "from-primary-glow to-accent",
  },
];

type ZoneKey = "kids" | "teen" | "parent" | null;

const riddles = [
  {
    q: "I have hands but cannot clap. What am I?",
    options: ["A clock", "A tree", "A river", "A book"],
    answer: 0,
  },
  {
    q: "I'm tall when I'm young, and short when I'm old. What am I?",
    options: ["A mountain", "A candle", "A giraffe", "A shadow"],
    answer: 1,
  },
  {
    q: "What has to be broken before you can use it?",
    options: ["A window", "A promise", "An egg", "A pencil"],
    answer: 2,
  },
];

const teenCareers: Record<string, { title: string; steps: { title: string; desc: string }[] }> = {
  Doctor: {
    title: "Doctor",
    steps: [
      { title: "Excel in Science (Class 9–12)", desc: "Focus on Biology, Chemistry, Physics. Build strong fundamentals." },
      { title: "Crack Medical Entrance (NEET)", desc: "Prepare with mocks, NCERT mastery, and disciplined revision." },
      { title: "MBBS Degree (5.5 years)", desc: "Complete medical school including the mandatory internship." },
      { title: "Specialize via PG (MD/MS)", desc: "Choose a field — cardiology, pediatrics, surgery, etc." },
      { title: "Practice & Grow", desc: "Hospital, private clinic, or research. Keep learning lifelong." },
    ],
  },
  Engineer: {
    title: "Engineer",
    steps: [
      { title: "Build Math + Physics base", desc: "Strengthen problem-solving from Class 9 onwards." },
      { title: "Crack JEE / State Entrance", desc: "Target IITs, NITs, or top regional colleges." },
      { title: "B.Tech (4 years)", desc: "Pick a branch — CSE, ECE, Mech, Civil — based on interest." },
      { title: "Internships & Projects", desc: "Build a portfolio on GitHub; intern at startups or MNCs." },
      { title: "Job, Higher Studies, or Startup", desc: "Join industry, pursue M.Tech/MS, or start your own venture." },
    ],
  },
  Lawyer: {
    title: "Lawyer",
    steps: [
      { title: "Strong English & Reasoning", desc: "Read widely, debate, and follow current affairs." },
      { title: "Crack CLAT or LSAT-India", desc: "Target NLUs or top private law universities." },
      { title: "5-Year Integrated LLB", desc: "BA/BBA + LLB combined program with internships every semester." },
      { title: "Bar Council Exam (AIBE)", desc: "Clear AIBE to get your license to practice." },
      { title: "Choose Your Path", desc: "Litigation, corporate law, judiciary, or LLM abroad." },
    ],
  },
  Designer: {
    title: "Designer",
    steps: [
      { title: "Build a Creative Habit", desc: "Sketch daily; learn Figma, Photoshop, Illustrator basics." },
      { title: "Crack NID / NIFT / UCEED", desc: "Prepare a portfolio + design aptitude for entrance exams." },
      { title: "Bachelor's in Design (4 years)", desc: "Specialize — UI/UX, product, fashion, communication design." },
      { title: "Internships & Live Projects", desc: "Work with studios, freelance, build a strong Behance/Dribbble." },
      { title: "Studio, Freelance, or Brand", desc: "Join a top studio, freelance globally, or launch your own label." },
    ],
  },
  "Government Job": {
    title: "Government Job",
    steps: [
      { title: "Pick Your Track", desc: "UPSC (IAS/IPS), SSC, Banking (IBPS), or State PSC." },
      { title: "Graduate in Any Stream", desc: "A bachelor's degree is the minimum eligibility for most exams." },
      { title: "Structured Prep (1–2 years)", desc: "GS, CSAT, current affairs, optional subject — daily routine." },
      { title: "Clear Prelims + Mains + Interview", desc: "Practice mock tests and answer writing consistently." },
      { title: "Training & Posting", desc: "Join LBSNAA / academy, then take charge of your service." },
    ],
  },
  Teacher: {
    title: "Teacher",
    steps: [
      { title: "Choose Your Subject", desc: "Find what you love teaching — science, math, arts, languages." },
      { title: "Bachelor's Degree", desc: "Complete BA/BSc in your chosen subject." },
      { title: "B.Ed (2 years)", desc: "Pursue Bachelor of Education for teaching qualification." },
      { title: "Clear TET / CTET", desc: "Pass Teacher Eligibility Test for school teaching jobs." },
      { title: "Teach & Mentor", desc: "Government/private school, then optionally NET for college teaching." },
    ],
  },
};

const parentTopics: Record<string, { title: string; tips: string[] }> = {
  "Daily Affairs": {
    title: "Daily Affairs",
    tips: [
      "Read one short news summary together at breakfast — builds awareness without overwhelm.",
      "Discuss one local + one global event each evening. Ask 'What do you think?' instead of lecturing.",
      "Use weekend quizzes to recap the week — turn it into a fun family ritual.",
    ],
  },
  "Cultural Knowledge": {
    title: "Cultural Knowledge",
    tips: [
      "Celebrate festivals with stories — explain why, not just how. Children remember meaning, not motions.",
      "Cook a regional dish together once a month and share its history.",
      "Visit a local heritage site, museum, or library every few weeks.",
    ],
  },
  "Parenting Tips": {
    title: "Parenting Tips",
    tips: [
      "Listen first, advise second. Most kids open up when they feel heard, not judged.",
      "Praise effort over outcome — 'You worked hard' beats 'You're so smart'.",
      "Set clear screen-time boundaries together; involve your child in setting the rules.",
    ],
  },
  "Tech Basics": {
    title: "Tech Basics",
    tips: [
      "Learn the basics of WhatsApp, UPI, and Google Maps — your kids will love teaching you.",
      "Enable two-factor authentication on email and banking apps. It's the simplest big win.",
      "Bookmark trusted sources; ignore forwards. Verify before you share anything online.",
    ],
  },
};

export function Zones() {
  const [open, setOpen] = useState<ZoneKey>(null);

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
                <div className="group relative h-full bg-card border border-border rounded-3xl overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all flex flex-col">
                  <div className={`h-32 bg-gradient-to-br ${z.accent} relative`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />
                    <div className="absolute -bottom-8 left-7 w-16 h-16 rounded-2xl bg-card border border-border grid place-items-center shadow-card">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-semibold">
                      {z.tag}
                    </span>
                  </div>
                  <div className="p-7 pt-12 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-foreground">{z.title}</h3>
                    <p className="mt-1 text-muted-foreground">{z.desc}</p>
                    <ul className="mt-6 space-y-3 flex-1">
                      {z.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-accent-soft grid place-items-center shrink-0">
                            <Check className="w-3 h-3 text-accent" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => setOpen(z.key)}
                      className="mt-6 w-full group/btn"
                      variant={z.key === "teen" ? "default" : "secondary"}
                    >
                      Enter {z.title}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Dialog open={open === "kids"} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-lg bg-gradient-to-br from-accent/10 via-card to-accent/5 border-accent/30">
          <KidsZoneGame onClose={() => setOpen(null)} />
        </DialogContent>
      </Dialog>

      <Dialog open={open === "teen"} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-primary/5 via-card to-primary/10 border-primary/30 max-h-[90vh] overflow-y-auto">
          <TeenHubPanel onClose={() => setOpen(null)} />
        </DialogContent>
      </Dialog>

      <Dialog open={open === "parent"} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-xl bg-gradient-to-br from-accent/5 via-card to-primary/5 border-primary/20 max-h-[90vh] overflow-y-auto">
          <ParentPortalPanel onClose={() => setOpen(null)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}

function KidsZoneGame({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = riddles[step];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === current.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (step + 1 >= riddles.length) {
        setDone(true);
      } else {
        setStep((s) => s + 1);
        setPicked(null);
      }
    }, 900);
  };

  const reset = () => {
    setStep(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  return (
    <div className="animate-fade-in">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl">
          <Gamepad2 className="w-6 h-6 text-accent" />
          KidsZone Riddles
        </DialogTitle>
        <DialogDescription>
          {done ? "Great job!" : `Riddle ${step + 1} of ${riddles.length}`}
        </DialogDescription>
      </DialogHeader>

      {!done ? (
        <div className="mt-4">
          <div className="rounded-2xl p-5 bg-accent/15 border border-accent/30 text-foreground text-lg font-semibold">
            {current.q}
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.options.map((opt, i) => {
              const isPicked = picked === i;
              const isCorrect = i === current.answer;
              const show = picked !== null;
              return (
                <button
                  key={opt}
                  onClick={() => pick(i)}
                  disabled={picked !== null}
                  className={`text-left rounded-xl p-4 border-2 font-medium transition-all hover:-translate-y-0.5 ${
                    show && isCorrect
                      ? "bg-accent/20 border-accent text-foreground"
                      : show && isPicked && !isCorrect
                        ? "bg-destructive/10 border-destructive text-foreground"
                        : "bg-card border-border hover:border-accent"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    {opt}
                    {show && isCorrect && <span>✅</span>}
                    {show && isPicked && !isCorrect && <span>❌</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-4 text-center py-6 animate-fade-in">
          <Sparkles className="w-12 h-12 text-accent mx-auto" />
          <h3 className="mt-3 text-3xl font-extrabold text-foreground">
            You scored {score}/{riddles.length}!
          </h3>
          <p className="mt-2 text-muted-foreground">
            {score === riddles.length ? "Perfect! You're a riddle master 🌟" : "Nice try — play again to beat your score!"}
          </p>
          <div className="mt-5 flex gap-3 justify-center">
            <Button onClick={reset} variant="default">Play Again</Button>
            <Button onClick={onClose} variant="outline"><X className="w-4 h-4" />Back</Button>
          </div>
        </div>
      )}

      {!done && (
        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Score: {score}</span>
          <Button onClick={onClose} variant="ghost" size="sm"><X className="w-4 h-4" />Back</Button>
        </div>
      )}
    </div>
  );
}

function TeenHubPanel({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const careers = Object.keys(teenCareers);
  const data = selected ? teenCareers[selected] : null;

  return (
    <div className="animate-fade-in">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl">
          <Compass className="w-6 h-6 text-primary" />
          Teen Hub — Career Roadmaps
        </DialogTitle>
        <DialogDescription>
          {selected ? `Your 5-step path to becoming a ${data?.title}` : "Pick a career to see the roadmap."}
        </DialogDescription>
      </DialogHeader>

      <div className="mt-4 flex flex-wrap gap-2">
        {careers.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all hover:-translate-y-0.5 ${
              selected === c
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:border-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {data && (
        <div className="mt-6 space-y-3 animate-fade-in">
          {data.steps.map((s, i) => (
            <div
              key={s.title}
              className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
            >
              <div className="w-10 h-10 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold">
                {i + 1}
              </div>
              <div>
                <h4 className="font-bold text-foreground">{s.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button onClick={onClose} variant="outline"><X className="w-4 h-4" />Back</Button>
      </div>
    </div>
  );
}

function ParentPortalPanel({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const topics = Object.keys(parentTopics);
  const data = selected ? parentTopics[selected] : null;

  return (
    <div className="animate-fade-in">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl">
          <BookHeart className="w-6 h-6 text-primary" />
          Parent Portal
        </DialogTitle>
        <DialogDescription>
          {selected ? data?.title : "Pick a topic to explore family-friendly tips."}
        </DialogDescription>
      </DialogHeader>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setSelected(t)}
            className={`p-3 rounded-xl text-sm font-semibold border-2 transition-all hover:-translate-y-0.5 ${
              selected === t
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:border-primary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {data && (
        <ul className="mt-6 space-y-3 animate-fade-in">
          {data.tips.map((tip, i) => (
            <li
              key={i}
              className="flex gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20"
            >
              <span className="w-7 h-7 shrink-0 rounded-full bg-accent text-white grid place-items-center text-xs font-bold">
                {i + 1}
              </span>
              <p className="text-sm text-foreground leading-relaxed">{tip}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex justify-end">
        <Button onClick={onClose} variant="outline"><X className="w-4 h-4" />Back</Button>
      </div>
    </div>
  );
}
