import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Zap, BarChart3, BellRing, Download, Lock, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

type AgeGroup = "Child" | "Teen" | "Parent";
const SUBJECTS = ["Math", "Science", "English", "Career Prep", "Coding", "Art"];

interface ScheduleSlot { time: string; subject: string; activity: string }
interface ScheduleDay { day: string; slots: ScheduleSlot[] }
interface ScheduleResp { headline: string; days: ScheduleDay[] }

export function Features() {
  // Schedule state
  const [openSchedule, setOpenSchedule] = useState(false);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("Teen");
  const [picked, setPicked] = useState<string[]>(["Math", "Science"]);
  const [hours, setHours] = useState<number[]>([2]);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleResp | null>(null);
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  // Progress state
  const [openProgress, setOpenProgress] = useState(false);
  const [ringPct, setRingPct] = useState(0);
  const [bars, setBars] = useState({ Math: 0, Science: 0, English: 0 });

  // Reminder state
  const [openReminder, setOpenReminder] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("18:00");
  const [enabled, setEnabled] = useState(true);
  const [activeReminder, setActiveReminder] = useState<string | null>(null);

  const toggleSubject = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const generateSchedule = async () => {
    if (picked.length === 0) {
      setScheduleError("Pick at least one subject.");
      return;
    }
    setScheduleLoading(true);
    setScheduleError(null);
    setSchedule(null);
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ageGroup, subjects: picked, hours: hours[0] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Failed");
      setSchedule(data);
    } catch (e) {
      setScheduleError(e instanceof Error ? e.message : "Failed to generate schedule.");
    } finally {
      setScheduleLoading(false);
    }
  };

  const openProgressDemo = () => {
    setOpenProgress(true);
    setRingPct(0);
    setBars({ Math: 0, Science: 0, English: 0 });
    // Animate after open
    setTimeout(() => setRingPct(73), 150);
    setTimeout(() => setBars({ Math: 75, Science: 60, English: 85 }), 250);
  };

  const formatTime = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hh = ((h + 11) % 12) + 1;
    return `${hh}:${m.toString().padStart(2, "0")} ${period}`;
  };

  const saveReminder = () => {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (enabled) {
      setActiveReminder(formatTime(time));
      toast.success(`✅ Reminder set! We'll nudge ${name} at ${formatTime(time)} if goals aren't done.`);
    } else {
      setActiveReminder(null);
      toast(`Reminder turned off for ${name}.`);
    }
    setOpenReminder(false);
  };

  const ringCirc = 2 * Math.PI * 52;
  const ringOffset = ringCirc - (ringPct / 100) * ringCirc;

  return (
    <section id="features" className="py-24 lg:py-32 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">Core Features</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground text-balance">
              Smart, adaptive <span className="text-primary">& accessible</span>
            </h2>
            <p className="mt-3 text-muted-foreground">Try every feature live — no signup needed.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {/* Smart Scheduling */}
          <Reveal>
            <div className="group h-full bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-accent grid place-items-center shadow-glow">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-foreground">Smart Scheduling</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Adaptive algorithms craft a personalized weekly plan around your age, subjects, and time.
              </p>
              <Button
                onClick={() => setOpenSchedule(true)}
                className="mt-6 self-start bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Sparkles className="w-4 h-4 mr-2" /> Try Scheduling
              </Button>
            </div>
          </Reveal>

          {/* Progress */}
          <Reveal delay={120}>
            <div className="group h-full bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-accent grid place-items-center shadow-glow">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-foreground">Progress Tracking</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Real-time analytics, mastery checkpoints, and offline-ready content — see growth at a glance.
              </p>
              <Button
                onClick={openProgressDemo}
                className="mt-6 self-start bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <BarChart3 className="w-4 h-4 mr-2" /> View Progress
              </Button>
            </div>
          </Reveal>

          {/* Reminder */}
          <Reveal delay={240}>
            <div className="group h-full bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-accent grid place-items-center shadow-glow">
                  <BellRing className="w-6 h-6 text-primary" />
                </div>
                <span className="text-3xl">🔔</span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-foreground">Smart Reminder System</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Auto push reminders when daily goals remain incomplete. Build accountability gently.
              </p>
              {activeReminder && (
                <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-accent/15 text-foreground border border-accent/30 px-3 py-1 text-sm animate-fade-in">
                  <BellRing className="w-3.5 h-3.5 text-accent" />
                  Active at <span className="font-semibold">{activeReminder}</span>
                </div>
              )}
              <Button
                onClick={() => setOpenReminder(true)}
                className="mt-6 self-start bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <BellRing className="w-4 h-4 mr-2" /> Set Reminder
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* SCHEDULE MODAL */}
      <Dialog open={openSchedule} onOpenChange={setOpenSchedule}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">⚡ Smart Scheduling</DialogTitle>
            <DialogDescription>Generate a personalized weekly study timetable in seconds.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 mt-2">
            <div>
              <Label className="text-sm font-semibold">Age group</Label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["Child", "Teen", "Parent"] as AgeGroup[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setAgeGroup(g)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                      ageGroup === g
                        ? "bg-primary text-primary-foreground border-primary shadow-soft"
                        : "bg-card border-border hover:border-primary/40"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">Subjects / topics</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {SUBJECTS.map((s) => {
                  const on = picked.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSubject(s)}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all ${
                        on
                          ? "bg-accent text-accent-foreground border-accent"
                          : "bg-card border-border hover:border-accent/50"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Study hours per day</Label>
                <span className="text-sm font-bold text-primary">{hours[0]} hr{hours[0] > 1 ? "s" : ""}</span>
              </div>
              <Slider min={1} max={6} step={1} value={hours} onValueChange={setHours} className="mt-3" />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
              </div>
            </div>

            <Button
              onClick={generateSchedule}
              disabled={scheduleLoading}
              className="w-full bg-gradient-accent text-primary hover:opacity-90 font-semibold"
            >
              {scheduleLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating…</>
              ) : (
                <><Sparkles className="w-4 h-4 mr-2" /> Generate Schedule</>
              )}
            </Button>

            {scheduleError && (
              <p className="text-sm text-destructive">{scheduleError}</p>
            )}

            {scheduleLoading && (
              <div className="grid sm:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-border p-4 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                ))}
              </div>
            )}

            {schedule && (
              <div className="animate-fade-in">
                <h4 className="text-lg font-bold text-foreground">{schedule.headline}</h4>
                <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {schedule.days.map((d) => (
                    <div key={d.day} className="rounded-xl border border-border bg-card p-4 shadow-soft">
                      <div className="text-sm font-bold text-primary">{d.day}</div>
                      <ul className="mt-3 space-y-2.5">
                        {d.slots.map((s, i) => (
                          <li key={i} className="text-sm">
                            <div className="flex items-baseline gap-2">
                              <span className="font-mono text-xs text-accent font-semibold">{s.time}</span>
                              <span className="font-medium text-foreground">{s.subject}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">{s.activity}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* PROGRESS MODAL */}
      <Dialog open={openProgress} onOpenChange={setOpenProgress}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">📊 Your Progress Dashboard</DialogTitle>
            <DialogDescription>Live mastery tracking across your subjects.</DialogDescription>
          </DialogHeader>

          <div className="mt-2 grid gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" stroke="var(--muted)" strokeWidth="10" fill="none" />
                  <circle
                    cx="60" cy="60" r="52"
                    stroke="var(--accent)" strokeWidth="10" fill="none" strokeLinecap="round"
                    strokeDasharray={ringCirc}
                    strokeDashoffset={ringOffset}
                    style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)" }}
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-foreground">{ringPct}%</div>
                    <div className="text-xs text-muted-foreground font-medium">Mastery</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full space-y-4">
                {(["Math", "Science", "English"] as const).map((sub) => (
                  <div key={sub}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-semibold text-foreground">{sub}</span>
                      <span className="text-muted-foreground">{bars[sub]}%</span>
                    </div>
                    <Progress value={bars[sub]} className="h-2.5" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-foreground mb-3">Mastery checkpoints</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-accent/40 bg-accent/10 p-3 text-center">
                  <CheckCircle2 className="w-6 h-6 mx-auto text-accent" />
                  <div className="mt-1 text-xs font-bold">Beginner</div>
                  <div className="text-[11px] text-muted-foreground">Unlocked</div>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-3 text-center opacity-70">
                  <Lock className="w-6 h-6 mx-auto text-muted-foreground" />
                  <div className="mt-1 text-xs font-bold">Intermediate</div>
                  <div className="text-[11px] text-muted-foreground">Locked</div>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-3 text-center opacity-70">
                  <Lock className="w-6 h-6 mx-auto text-muted-foreground" />
                  <div className="mt-1 text-xs font-bold">Advanced</div>
                  <div className="text-[11px] text-muted-foreground">Locked</div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => toast.success("📄 Report downloaded!")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Download className="w-4 h-4 mr-2" /> Download Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* REMINDER MODAL */}
      <Dialog open={openReminder} onOpenChange={setOpenReminder}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">🔔 Set Daily Reminder</DialogTitle>
            <DialogDescription>We'll gently nudge you if your goals aren't done.</DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-5">
            <div>
              <Label htmlFor="rname" className="text-sm font-semibold">Your name</Label>
              <Input
                id="rname" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Alex" className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="rtime" className="text-sm font-semibold">Daily study goal time</Label>
              <Input
                id="rtime" type="time" value={time} onChange={(e) => setTime(e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4">
              <div>
                <div className="text-sm font-semibold text-foreground">Reminder</div>
                <div className="text-xs text-muted-foreground">{enabled ? "On — we'll nudge you" : "Off — no reminders"}</div>
              </div>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>

            <Button
              onClick={saveReminder}
              className="w-full bg-gradient-accent text-primary hover:opacity-90 font-semibold"
            >
              Save Reminder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
