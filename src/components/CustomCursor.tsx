import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useMotionPreference } from "@/hooks/use-motion-preference";

export function CustomCursor() {
  const { reduced } = useMotionPreference();

  if (reduced) return null;

  return <CustomCursorInner />;
}

function CustomCursorInner() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const [label, setLabel] = useState<string | null>(null);
  const [variant, setVariant] = useState<"default" | "link" | "text">("default");
  const [pressed, setPressed] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't run the custom cursor on touch/coarse-pointer devices.
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setEnabled(true);

    const move = (e: MouseEvent) => {
      // Direct positioning — no continuous spring calculations.
      x.set(e.clientX);
      y.set(e.clientY);

      setVisible(true);

      const target = e.target as HTMLElement | null;

      const cursorEl = target?.closest<HTMLElement>("[data-cursor]");

      if (cursorEl) {
        const value = (cursorEl.getAttribute("data-cursor") || "").trim();

        setLabel(value || null);
        setVariant("link");
        return;
      }

      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, select, [data-clickable]"
      );

      if (interactive) {
        setLabel(null);
        setVariant("link");
        return;
      }

      const textish = target?.closest(
        "p, h1, h2, h3, h4, h5, h6, li, span, blockquote"
      );

      if (textish && (textish as HTMLElement).innerText?.trim().length) {
        setLabel(null);
        setVariant("text");
        return;
      }

      setLabel(null);
      setVariant("default");
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);

      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [x, y]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.style.cursor = "none";

    return () => {
      document.documentElement.style.cursor = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize =
    variant === "text"
      ? 4
      : variant === "link"
        ? label
          ? 56
          : 44
        : 32;

  const ringScale = pressed ? 0.88 : 1;

  const ringOpacity = visible ? 1 : 0;

  const dotScale =
    variant === "link"
      ? 0
      : variant === "text"
        ? 0
        : pressed
          ? 0.6
          : 1;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[101] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            scale: ringScale,
            opacity: ringOpacity,
            backgroundColor:
              variant === "text"
                ? "hsl(0 0% 100% / 0.95)"
                : "hsl(0 0% 100% / 0)",
            borderColor:
              variant === "link"
                ? "hsl(0 0% 100% / 0.9)"
                : "hsl(0 0% 100% / 0.55)",
            borderWidth: variant === "text" ? 0 : 1.25,
          }}
          transition={{
            duration: 0.15,
            ease: "easeOut",
          }}
          style={{ mixBlendMode: "difference" }}
          className="rounded-full border border-solid"
        />
      </motion.div>

      {/* Center dot */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[102] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: dotScale,
            opacity: ringOpacity,
          }}
          transition={{
            duration: 0.12,
            ease: "easeOut",
          }}
          style={{ mixBlendMode: "difference" }}
          className="h-1 w-1 rounded-full bg-white"
        />
      </motion.div>

      {/* Floating label */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[103] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          initial={false}
          animate={{
            opacity: label ? 1 : 0,
            scale: label ? 1 : 0.9,
          }}
          transition={{
            duration: 0.12,
            ease: "easeOut",
          }}
          className="whitespace-nowrap rounded-full bg-primary/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-primary-foreground shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-sm"
        >
          {label}
        </motion.div>
      </motion.div>
    </>
  );
}
