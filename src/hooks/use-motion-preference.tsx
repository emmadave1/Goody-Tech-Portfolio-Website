import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type MotionMode = "auto" | "full" | "reduced";
const STORAGE_KEY = "goody:motion-pref";

type Ctx = {
  mode: MotionMode;
  setMode: (m: MotionMode) => void;
  reduced: boolean;
};

const MotionPrefContext = createContext<Ctx | null>(null);

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<MotionMode>("auto");
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as MotionMode | null;
      if (saved === "full" || saved === "reduced" || saved === "auto") {
        setModeState(saved);
      }
    } catch {}
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setSystemReduced(mql.matches);
    on();
    mql.addEventListener("change", on);
    return () => mql.removeEventListener("change", on);
  }, []);

  const setMode = useCallback((m: MotionMode) => {
    setModeState(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {}
  }, []);

  const reduced = mode === "reduced" || (mode === "auto" && systemReduced);

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced]);

  return (
    <MotionPrefContext.Provider value={{ mode, setMode, reduced }}>
      {children}
    </MotionPrefContext.Provider>
  );
}

export function useMotionPreference() {
  const ctx = useContext(MotionPrefContext);
  if (!ctx) return { mode: "auto" as MotionMode, setMode: () => {}, reduced: false };
  return ctx;
}
