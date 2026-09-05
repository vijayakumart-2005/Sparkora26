import { event } from "@/data/event";
import { RegisterButton, Reveal, SlideSection } from "./primitives";

export function RegistrationCTA() {
  return (
    <SlideSection
      slideIndex="08 // FINALE"
      slideTag="JOIN NOW"
      className="text-center overflow-hidden py-12 sm:py-16 md:py-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-ember/15 blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/15 blur-[110px]" />
      </div>

      <Reveal>
        <h2 className="mx-auto max-w-3xl text-4xl leading-[0.95] font-bold sm:text-6xl md:text-7xl">
          Ready to spark <span className="gradient-text">something?</span>
        </h2>
        <p className="mt-6 font-display text-sm tracking-[0.3em] text-ember uppercase sm:text-base font-semibold">
          {event.date} • {event.venue}
        </p>
        <div className="mt-10 flex justify-center">
          <RegisterButton size="lg" />
        </div>
        <p className="mx-auto mt-8 max-w-md text-sm text-muted-foreground sm:text-base">
          Bring your team. Choose your domain. Build something that matters.
        </p>
      </Reveal>
    </SlideSection>
  );
}
