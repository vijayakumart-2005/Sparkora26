import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { event } from "@/data/event";
import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 px-5 py-20 sm:px-8 md:py-28", className)}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SlideSection({
  id,
  children,
  className,
  slideIndex,
  slideTag,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  slideIndex?: string;
  slideTag?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <section
      id={id}
      className="relative scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: reduce ? 0 : 0.75, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "slide-overlay relative overflow-hidden p-6 sm:p-10 md:p-12 lg:p-14",
            "hover:border-primary/40 transition-colors duration-500",
            className,
          )}
        >
          {/* Top luminous accent beam */}
          <span
            aria-hidden="true"
            className="rule-gradient absolute inset-x-0 top-0 h-[2px] opacity-75"
          />

          {/* Corner tech accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-3.5 left-3.5 h-3 w-3 border-t border-l border-primary/40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-3.5 right-3.5 h-3 w-3 border-t border-r border-ember/40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3.5 left-3.5 h-3 w-3 border-b border-l border-primary/40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3.5 right-3.5 h-3 w-3 border-b border-r border-ember/40"
          />

          {/* Slide index header */}
          {slideIndex ? (
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/8 pb-4">
              <span className="font-display text-[0.65rem] sm:text-xs font-bold tracking-[0.3em] text-primary/80 uppercase">
                {slideIndex}
              </span>
              {slideTag ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 font-display text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
                  {slideTag}
                </span>
              ) : null}
            </div>
          ) : null}

          {/* Slide Content */}
          <div className="relative z-10">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn("mb-14", align === "center" && "text-center")}>
      {eyebrow ? (
        <p className="label-eyebrow mb-5 flex items-center gap-3">
          <span className="rule-gradient inline-block h-px w-10" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-5xl leading-[0.9] font-bold sm:text-6xl md:text-7xl lg:text-8xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-5 max-w-xl text-base text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

export function RegisterButton({
  className,
  label = "REGISTER NOW",
  size = "md",
}: {
  className?: string;
  label?: string;
  size?: "md" | "lg";
}) {
  return (
    <a
      href={event.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — opens the registration form in a new tab`}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-ember font-display font-semibold tracking-[0.18em] text-ember-foreground uppercase transition-all duration-300 hover:glow-ember hover:brightness-110 focus-visible:glow-ember",
        size === "lg" ? "px-10 py-5 text-sm sm:text-base" : "px-7 py-3.5 text-xs sm:text-sm",
        className,
      )}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{label}</span>
      <span className="relative transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
