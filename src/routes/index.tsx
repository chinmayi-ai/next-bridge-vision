import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Zones } from "@/components/sections/Zones";
import { Careers } from "@/components/sections/Careers";
import { Features } from "@/components/sections/Features";
import { Advantage } from "@/components/sections/Advantage";
import { CtaFooter } from "@/components/sections/CtaFooter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Zones />
        <Careers />
        <Features />
        <Advantage />
        <CtaFooter />
      </main>
    </div>
  );
}
