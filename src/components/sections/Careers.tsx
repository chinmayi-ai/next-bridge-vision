import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Sparkles, Loader2, Compass } from "lucide-react";

interface Step {
  title: string;
  desc: string;
}

interface Roadmap {
  career: string;
  headline: string;
  steps: Step[];
}

const examples = ["Cybersecurity Expert", "Marine Biologist", "Game Developer", "Astronaut", "AI Researcher"];

export function Careers() {
  const [career, setCareer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  async function generate(value: string) {
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Please enter a career to explore.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ career: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to generate roadmap.");
      setRoadmap(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setRoadmap(null);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    generate(career);
  }

  return (
    <section id="careers" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">Teen Hub</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground text-balance">
              Explore <span className="text-primary">any career</span> with AI
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Type any career — from astronaut to ethical hacker — and get a personalized roadmap in seconds.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form
            onSubmit={onSubmit}
            className="mt-10 bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-card"
          >
            <label htmlFor="career-input" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Your dream career
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Compass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                <input
                  id="career-input"
                  type="text"
                  value={career}
                  onChange={(e) => setCareer(e.target.value)}
                  placeholder="e.g. Cybersecurity Expert, Marine Biologist…"
                  disabled={loading}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground font-medium shadow-soft focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-14 px-6 rounded-2xl bg-gradient-accent text-primary font-bold shadow-glow hover:opacity-95 transition disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Roadmap
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground self-center mr-1">Try:</span>
              {examples.map((ex) => (
                <button
                  type="button"
                  key={ex}
                  disabled={loading}
                  onClick={() => {
                    setCareer(ex);
                    generate(ex);
                  }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-secondary text-secondary-foreground hover:border-accent/40 hover:bg-accent-soft transition disabled:opacity-60"
                >
                  {ex}
                </button>
              ))}
            </div>

            {error && (
              <p className="mt-4 text-sm text-destructive font-medium">{error}</p>
            )}
          </form>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 sm:mt-14 bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-card min-h-[280px]">
            {loading && (
              <div className="space-y-4 animate-pulse">
                <div className="h-6 w-2/3 rounded bg-muted" />
                <div className="space-y-3 mt-6">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-5 rounded-2xl bg-gradient-soft border border-border">
                      <div className="h-3 w-20 bg-muted rounded mb-3" />
                      <div className="h-5 w-1/2 bg-muted rounded mb-2" />
                      <div className="h-4 w-full bg-muted rounded" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading && !roadmap && !error && (
              <div className="text-center py-10">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-accent-soft text-accent grid place-items-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Your AI roadmap will appear here</h3>
                <p className="text-muted-foreground mt-1">Enter a career above to get started.</p>
              </div>
            )}

            {!loading && roadmap && (
              <>
                <div className="flex items-center gap-3 mb-8 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
                    Roadmap
                  </span>
                  <h3 key={roadmap.career} className="text-xl sm:text-2xl font-bold text-foreground animate-fade-in">
                    {roadmap.headline}
                  </h3>
                </div>

                <ol key={roadmap.career} className="relative space-y-4 animate-fade-in">
                  <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-accent via-primary-glow to-primary hidden sm:block" />
                  {roadmap.steps.map((r, i) => (
                    <li
                      key={`${roadmap.career}-${i}`}
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
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
