import { prizes, totalPrizePool } from "@/data/event";
import { Reveal, SlideSection, SectionHeading } from "./primitives";
import { Trophy, Medal, Award } from "lucide-react";

export function Prizes() {
  const prizeIcons = [Trophy, Medal, Award];
  const prizeGlows = [
    "from-amber-400/20 via-yellow-500/10 to-transparent border-amber-400/50 text-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.22)]",
    "from-slate-300/15 via-blue-400/10 to-transparent border-slate-300/40 text-slate-200 shadow-[0_0_30px_rgba(203,213,225,0.15)]",
    "from-amber-700/20 via-orange-600/10 to-transparent border-amber-600/40 text-amber-500 shadow-[0_0_30px_rgba(217,119,6,0.15)]",
  ];

  return (
    <SlideSection id="prizes" slideIndex="04 // REWARDS" slideTag="PRIZE POOL">
      <SectionHeading
        eyebrow="Rewards"
        title="Prize Pool"
        subtitle="Build. Solve. Stand out."
        align="center"
      />

      {/* Total pool highlight */}
      <Reveal className="mx-auto mb-10 max-w-sm">
        <div className="glass-card relative overflow-hidden rounded-2xl border border-yellow-500/40 p-8 text-center shadow-[0_0_50px_rgba(234,179,8,0.2)]">
          <span className="rule-gradient absolute inset-x-0 top-0 h-[2px]" />
          <p className="font-display text-[0.65rem] font-bold tracking-[0.4em] text-yellow-400/90 uppercase sm:text-xs">
            Total Prize Pool
          </p>
          <p className="mt-3 font-display text-5xl font-black tracking-tight text-white sm:text-6xl drop-shadow-md">
            {totalPrizePool}
          </p>
          <p className="mt-2 font-display text-[0.65rem] font-medium tracking-[0.25em] text-zinc-400 uppercase sm:text-xs">
            Cash Prizes + Certificates
          </p>
        </div>
      </Reveal>

      {/* Individual Prize Podium Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        {prizes.map((p, i) => {
          const Icon = prizeIcons[i] ?? Trophy;
          return (
            <Reveal key={p.no} delay={i * 0.1}>
              <div
                className={`glass-card group relative flex flex-col items-center justify-between rounded-2xl border p-8 text-center transition-all duration-300 hover:-translate-y-1.5 ${prizeGlows[i]}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="mt-5">
                  <span className="font-display text-xs tracking-[0.3em] uppercase opacity-75">
                    {p.title}
                  </span>
                  <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    {p.amount}
                  </p>
                </div>
                <span className="mt-4 font-display text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">
                  Rank {p.no}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SlideSection>
  );
}
