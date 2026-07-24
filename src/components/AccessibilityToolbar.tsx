import { useState } from "react";
import { Accessibility, X } from "lucide-react";
import { useMotionPreference } from "@/hooks/use-motion-preference";

export function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const { mode, setMode, reduced } = useMotionPreference();

  return (
    <div className="fixed bottom-4 right-4 z-[95] print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Accessibility preferences"
          className="mb-3 w-64 rounded-2xl border border-border bg-card/95 p-4 text-card-foreground shadow-[var(--shadow-lift)] backdrop-blur"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Motion
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close accessibility panel"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div
            role="radiogroup"
            aria-label="Animation preference"
            className="grid grid-cols-3 gap-1 rounded-full bg-muted/60 p-1 text-xs"
          >
            {(["auto", "full", "reduced"] as const).map((m) => (
              <button
                key={m}
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-full px-2 py-1.5 font-medium capitalize transition-colors ${
                  mode === m
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
            {reduced
              ? "Animations, floating gradients and the custom cursor are minimized."
              : "Full animations are enabled. Auto follows your OS setting."}
          </p>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Accessibility preferences"
        aria-expanded={open}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-primary text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Accessibility className="h-5 w-5" />
      </button>
    </div>
  );
}
