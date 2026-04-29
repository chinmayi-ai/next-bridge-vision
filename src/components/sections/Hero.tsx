import { ArrowRight, Baby, GraduationCap, Users } from "lucide-react";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32 bg-gradient-hero text-primary-foreground"
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -right-20 w-[28rem] h-[28rem] rounded-full bg-primary-glow/40 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            AI-Powered • Age-Adaptive
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-balance">
            Redefining education through{" "}
            <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
              personalized, AI-powered learning
            </span>{" "}
            for all ages
          </h1>

          <p className="mt-6 text-lg lg:text-xl text-white/80 max-w-xl text-balance">
            One platform for children, teenagers, and parents — all learning together.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-accent text-accent-foreground font-semibold shadow-glow hover:scale-[1.03] transition-transform"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#zones"
              className="inline-flex items-center h-12 px-6 rounded-full border border-white/25 text-white/90 font-medium hover:bg-white/10 transition-colors"
            >
              Explore Platform
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/70">
            <span>✓ No credit card</span>
            <span>✓ Family-friendly</span>
            <span>✓ Built by Team CODEX</span>
          </div>
        </div>

        {/* Three-age illustration */}
        <div className="lg:col-span-5 relative">
          <div className="relative h-[420px] grid grid-cols-2 gap-4">
            <FloatingCard icon={<Baby className="w-7 h-7" />} title="Children" tone="accent" className="col-span-1 row-span-1 mt-8" />
            <FloatingCard icon={<GraduationCap className="w-7 h-7" />} title="Teenagers" tone="white" className="col-span-1 row-span-2" delay="1.5s" />
            <FloatingCard icon={<Users className="w-7 h-7" />} title="Parents" tone="primary" className="col-span-1 -mt-4" delay="3s" />
            <div className="absolute inset-0 -z-10 grid place-items-center">
              <div className="w-72 h-72 rounded-full bg-gradient-accent opacity-30 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  icon, title, tone, className = "", delay = "0s",
}: {
  icon: React.ReactNode;
  title: string;
  tone: "accent" | "white" | "primary";
  className?: string;
  delay?: string;
}) {
  const tones: Record<string, string> = {
    accent: "bg-accent text-accent-foreground",
    white: "bg-white text-primary",
    primary: "bg-primary-glow text-white",
  };
  return (
    <div
      className={`animate-float rounded-2xl p-5 shadow-card flex flex-col justify-between ${tones[tone]} ${className}`}
      style={{ animationDelay: delay }}
    >
      <div className="w-12 h-12 rounded-xl bg-black/5 grid place-items-center">{icon}</div>
      <div className="mt-4">
        <div className="text-xs uppercase tracking-wider opacity-70">Learning Zone</div>
        <div className="text-lg font-bold">{title}</div>
      </div>
    </div>
  );
}
