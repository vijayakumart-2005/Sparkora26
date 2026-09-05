import { event, stats } from "@/data/event";
import { Reveal, SlideSection, SectionHeading } from "./primitives";

export function About() {
  return (
    <SlideSection id="about" slideIndex="01 // ABOUT" slideTag="OVERVIEW">
      <SectionHeading eyebrow="About" title="The Spark" />
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <Reveal>
          <p className="text-xl leading-relaxed text-foreground sm:text-2xl font-light">{event.intro}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {event.about}
          </p>
        </Reveal>
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="glass-card group relative h-full rounded-2xl p-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-card/60 hover:-translate-y-1">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
                  {s.value}
                </span>
                <span className="mt-3 block font-display text-[0.65rem] tracking-[0.24em] text-primary/80 uppercase sm:text-[0.72rem]">
                  {s.label}
                </span>
              </dd>
              <span
                aria-hidden="true"
                className="rule-gradient absolute inset-x-0 bottom-0 h-[2px] scale-x-0 transition-transform duration-500 group-hover:scale-x-100 rounded-b-2xl"
              />
            </div>
          </Reveal>
        ))}
      </dl>
    </SlideSection>
  );
}
