import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });

  // Trail dots
  const trailCount = 5;
  const trails = Array.from({ length: trailCount }, (_, i) => ({
    x: useSpring(cursorX, { stiffness: 200 - i * 30, damping: 25 + i * 3 }),
    y: useSpring(cursorY, { stiffness: 200 - i * 30, damping: 25 + i * 3 }),
  }));

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onEnterInteractive = () => setHovering(true);
    const onLeaveInteractive = () => setHovering(false);

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Detect hoverable elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
      return interactives;
    };

    const interactives = addHoverListeners();
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Trail dots */}
      {trails.map((trail, i) => (
        <motion.div
          key={i}
          style={{
            x: trail.x,
            y: trail.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute left-0 top-0 rounded-full"
          animate={{
            width: 6 - i,
            height: 6 - i,
            opacity: 0.4 - i * 0.07,
          }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(168,85,247,${0.6 - i * 0.1}), rgba(59,130,246,${0.4 - i * 0.08}))`,
            }}
          />
        </motion.div>
      ))}

      {/* Outer ring — expands on hover */}
      <motion.div
        animate={{
          width: hovering ? 50 : 36,
          height: hovering ? 50 : 36,
          opacity: clicking ? 0.6 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute left-0 top-0 rounded-full border border-purple-400/50"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.08), rgba(59,130,246,0.04), transparent)",
        }}
      />

      {/* Inner dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicking ? 0.7 : hovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="absolute left-0 top-0"
      >
        <div
          className="h-2.5 w-2.5 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,1), rgba(99,102,241,0.9))",
            boxShadow:
              "0 0 8px rgba(168,85,247,0.6), 0 0 16px rgba(99,102,241,0.3)",
          }}
        />
      </motion.div>
    </div>
  );
}
