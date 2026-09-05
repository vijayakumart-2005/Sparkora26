import { CalendarDays, MapPin, Radio, Users } from "lucide-react";
import { event } from "@/data/event";
import { Reveal, SlideSection } from "./primitives";

export function TeamInfo() {
  const items = [
    { icon: Users, label: "Team size", value: "2–3 MEMBERS" },
    { icon: Radio, label: "Mode", value: "OFFLINE" },
    { icon: MapPin, label: "Venue", value: event.venue.toUpperCase() },
    { icon: CalendarDays, label: "Date", value: event.date },
  ];

  return (
    <SlideSection slideIndex="05 // DETAILS" slideTag="ESSENTIALS">
      <Reveal>
        <p className="label-eyebrow mb-3 flex items-center gap-3">
          <span className="rule-gradient inline-block h-px w-10" aria-hidden="true" />
          Event Logistics
        </p>
        <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">
          Build <span className="gradient-text">together.</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.07}>
            <div className="glass-card group flex h-full items-start gap-4 rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:bg-card/55 hover:-translate-y-1">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <it.icon aria-hidden="true" strokeWidth={1.4} className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="label-eyebrow !text-[0.65rem]">{it.label}</p>
                <p className="mt-1.5 font-display text-base font-bold tracking-[0.08em] uppercase text-foreground">
                  {it.value}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideSection>
  );
}
