import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Stethoscope, Cog, Scale, Palette, Landmark, ArrowRight, type LucideIcon } from "lucide-react";

type CareerKey = "doctor" | "engineer" | "lawyer" | "designer" | "govt";

interface Career {
  key: CareerKey;
  label: string;
  icon: LucideIcon;
  headline: string;
  roadmap: { title: string; desc: string }[];
}

const careers: Career[] = [
  {
    key: "doctor",
    label: "Doctor",
    icon: Stethoscope,
    headline: "Becoming a Doctor",
    roadmap: [
      { title: "High School Preparation", desc: "Focus on Biology, Chemistry & Physics. Build strong study habits early." },
      { title: "Undergraduate Degree", desc: "Pre-med or related Bachelor's with strong GPA and lab experience." },
      { title: "Medical School", desc: "4 years of medical training — entrance exam, clinical rotations." },
      { title: "Residency Training", desc: "3–7 years specializing in your chosen field of medicine." },
      { title: "Licensure & Practice", desc: "Pass licensing exams and begin your professional medical career." },
    ],
  },
  {
    key: "engineer",
    label: "Engineer",
    icon: Cog,
    headline: "Becoming an Engineer",
    roadmap: [
      { title: "High School Foundations", desc: "Strong base in Math, Physics & Computer Science." },
      { title: "Engineering Entrance Exam", desc: "Prepare for JEE / equivalent and pick a specialization." },
      { title: "Bachelor's in Engineering", desc: "4 years of core curriculum, projects, and internships." },
      { title: "Internships & Specialization", desc: "Industry exposure, certifications, and portfolio building." },
      { title: "Career Launch or Higher Studies", desc: "Join industry, pursue Master's, or build a startup." },
    ],
  },
  {
    key: "lawyer",
    label: "Lawyer",
    icon: Scale,
    headline: "Becoming a Lawyer",
    roadmap: [
      { title: "High School with Humanities", desc: "Strong English, Civics, and analytical reasoning skills." },
      { title: "Law Entrance (CLAT / LSAT)", desc: "Prepare for national-level law admission tests." },
      { title: "Law Degree (LLB / 5-yr Integrated)", desc: "Coursework, moot courts, and internships at law firms." },
      { title: "Bar Council Enrollment", desc: "Pass the Bar Exam and register as a practicing advocate." },
      { title: "Practice & Specialize", desc: "Choose corporate, criminal, civil, or constitutional law." },
    ],
  },
  {
    key: "designer",
    label: "Designer",
    icon: Palette,
    headline: "Becoming a Designer",
    roadmap: [
      { title: "Build Visual Foundations", desc: "Learn design principles, color, typography, and sketching." },
      { title: "Master the Tools", desc: "Figma, Adobe Suite, prototyping & motion fundamentals." },
      { title: "Design Degree or Bootcamp", desc: "Formal training in UX/UI, graphic, or product design." },
      { title: "Build Your Portfolio", desc: "Real projects, case studies, and freelance experience." },
      { title: "Land Your First Role", desc: "Junior designer at a studio, agency, or product team." },
    ],
  },
  {
    key: "govt",
    label: "Government Job",
    icon: Landmark,
    headline: "Cracking a Government Job",
    roadmap: [
      { title: "Identify the Right Exam", desc: "UPSC, SSC, Banking, State PSC — match to your goals." },
      { title: "Bachelor's Degree", desc: "Graduate in any discipline meeting eligibility criteria." },
      { title: "Structured Exam Prep", desc: "Daily current affairs, mock tests, and subject mastery." },
      { title: "Prelims, Mains & Interview", desc: "Clear each stage with strategy and consistency." },
      { title: "Training & Posting", desc: "Complete official training and begin public service." },
    ],
  },
];

export function Careers() {
  const [active, setActive] = useState<CareerKey>("doctor");
  const current = careers.find((c) => c.key === active)!;

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

        {/* Mobile dropdown */}
        <Reveal delay={80}>
          <div className="mt-10 sm:hidden">
            <label htmlFor="career-select" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Choose a career
            </label>
            <div className="relative">
              <select
                id="career-select"
                value={active}
                onChange={(e) => setActive(e.target.value as CareerKey)}
                className="w-full appearance-none h-14 pl-5 pr-12 rounded-2xl border border-border bg-card text-foreground font-semibold shadow-soft focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {careers.map((c) => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
              <ArrowRight className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent rotate-90" />
            </div>
          </div>
        </Reveal>

        {/* Tile selector */}
        <Reveal delay={120}>
          <div className="mt-8 sm:mt-12 hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-4">
            {careers.map((c) => {
              const Icon = c.icon;
              const isActive = active === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  aria-pressed={isActive}
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
          <div className="mt-10 sm:mt-14 bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-card">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
                Roadmap
              </span>
              <h3 key={current.key} className="text-xl sm:text-2xl font-bold text-foreground animate-fade-in">
                {current.headline}
              </h3>
            </div>

            <ol key={current.key} className="relative space-y-4 animate-fade-in">
              <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-accent via-primary-glow to-primary hidden sm:block" />
              {current.roadmap.map((r, i) => (
                <li
                  key={`${current.key}-${i}`}
                  className="relative sm:pl-14 p-5 sm:p-6 rounded-2xl bg-gradient-soft border border-border hover:border-accent/40 transition-colors"
                >
                  <span className="hidden sm:grid absolute left-0 top-5 w-9 h-9 rounded-full bg-gradient-accent text-primary font-bold place-items-center shadow-glow">
                    {i + 1}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
                    Step {i + 1}
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
