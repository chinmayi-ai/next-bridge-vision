import { Reveal } from "@/components/Reveal";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaFooter() {
  return (
    <>
      <section id="cta" className="relative py-24 lg:py-32 overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-accent/30 blur-3xl animate-blob" />
          <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-primary-glow/40 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs font-semibold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> Ready when you are
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance leading-[1.05]">
              Start your family's <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
                learning journey today
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto">
              Join the platform built for every age in your home — free, forever to start.
            </p>
            <a
              href="#top"
              className="mt-10 inline-flex items-center gap-2 h-14 px-9 rounded-full bg-accent text-accent-foreground font-bold text-lg shadow-glow hover:scale-[1.04] transition-transform"
            >
              Join Next Bridge Free
              <ArrowRight className="w-5 h-5" />
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg">
              <span className="w-9 h-9 rounded-xl bg-gradient-accent grid place-items-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </span>
              Next Bridge
            </div>
            <p className="mt-4 text-sm text-white/70 max-w-xs">
              AI-powered, age-adaptive learning for children, teenagers, and parents.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Built by</h4>
            <p className="mt-3 text-lg font-bold">Team CODEX</p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Members</h4>
            <ul className="mt-3 space-y-1.5 text-white/85">
              <li>Kruthika B M</li>
              <li>Bhoomika N</li>
              <li>Chinmayi G J</li>
              <li>Sindhu M</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 text-sm text-white/60 flex flex-wrap items-center justify-between gap-3">
            <span>© {new Date().getFullYear()} Next Bridge. All rights reserved.</span>
            <span>Crafted with care by Team CODEX.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
