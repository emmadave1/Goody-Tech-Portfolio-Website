import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Palette,
  Printer,
  CreditCard,
  Shirt,
  Coffee,
  Sparkles,
  X,
  Menu,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

import founder from "@/assets/about-img2.png";
import { PROJECTS, SERVICES, type Project, type ServiceId } from "@/lib/goody-data";
import { useMotionPreference } from "@/hooks/use-motion-preference";

const CustomCursor = lazy(() =>
  import("@/components/CustomCursor").then((m) => ({ default: m.CustomCursor }))
);
const AccessibilityToolbar = lazy(() =>
  import("@/components/AccessibilityToolbar").then((m) => ({ default: m.AccessibilityToolbar }))
);

const SITE_URL = "https://goodytech";
const SITE_TITLE = "Goody Tech — Creative Branding, Graphic Design & Premium Printing Studio";
const SITE_DESCRIPTION =
  "Goody Tech is a creative studio crafting distinctive brand identities, striking graphic design, and premium print — banners, business cards, apparel, and mugs that help businesses stand out.";
const SITE_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "Goody Tech, branding studio, graphic design, logo design, premium printing, business cards, banners, apparel printing, brand identity",
      },
      { name: "author", content: "Goody Tech" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0F5132" },

      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Goody Tech" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: SITE_OG_IMAGE },
      { property: "og:image:alt", content: "Goody Tech — Creative branding and premium print studio" },
      { property: "og:locale", content: "en_US" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: SITE_OG_IMAGE },
      { name: "twitter:image:alt", content: "Goody Tech — Creative branding and premium print studio" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "preload", as: "image", href: founder, fetchpriority: "high" },
    ],
  }),
});


const SERVICE_ICONS: Record<ServiceId, React.ComponentType<{ className?: string }>> = {
  graphic: Palette,
  banner: Printer,
  card: CreditCard,
  tshirt: Shirt,
  mug: Coffee,
  brand: Sparkles,
};

function Index() {
  const [activeService, setActiveService] = useState<ServiceId | null>(null);
  const [showProjects, setShowProjects] = useState(false);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const serviceCardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const filteredProjects = useMemo(
    () => (activeService ? PROJECTS.filter((p) => p.service === activeService) : []),
    [activeService]
  );

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const handleSelectService = (id: ServiceId) => {
    setActiveService(id);
    setShowProjects(true);
    setProjectsLoading(true);
    window.setTimeout(() => {
      document
        .getElementById("work")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 320);
    window.setTimeout(() => setProjectsLoading(false), 700);
  };

  const handleClearService = () => {
    setShowProjects(false);
    // Keep activeService highlighted; scroll back and center the selected card.
    window.setTimeout(() => {
      const el = activeService ? serviceCardRefs.current[activeService] : null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      } else {
        document
          .getElementById("services")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  };

  useEffect(() => {
    if (openProject) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [openProject]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence>{loading && <Preloader key="pre" />}</AnimatePresence>
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      <Nav />
      <main id="main">
        <Hero />
        <ServicesSection
          active={activeService}
          showProjects={showProjects}
          onSelect={handleSelectService}
          registerRef={(id, el) => (serviceCardRefs.current[id] = el)}
        />
        <AnimatePresence mode="wait">
          {showProjects && activeService && (
            <ProjectsSection
              key={activeService}
              service={activeService}
              projects={filteredProjects}
              loading={projectsLoading}
              onOpen={setOpenProject}
              onBack={handleClearService}
            />
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <AnimatePresence>
        {openProject && (
          <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
        )}
      </AnimatePresence>
      <Suspense fallback={null}>
        <AccessibilityToolbar />
      </Suspense>
    </div>
  );
}

/* ------------------------------ PRELOADER --------------------------------- */

function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
    >
      <div className="absolute inset-x-0 top-0 h-px shimmer-line" />
      <div className="absolute inset-x-0 bottom-0 h-px shimmer-line" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          <div className="preloader-orbit absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl font-semibold text-primary"
            >
              G
            </motion.span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs uppercase tracking-[0.4em] text-primary-soft/80"
        >
          Goody Tech · Loading
        </motion.div>
        <div className="relative h-[2px] w-48 overflow-hidden rounded-full bg-primary/15">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-y-0 w-1/2 bg-primary"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* --------------------------- FLOATING GRADIENTS --------------------------- */

function FloatingGradients({
  variant = "a",
  className = "",
}: {
  variant?: "a" | "b" | "c" | "d";
  className?: string;
}) {
  // Per-variant blob configs (position, size, color, duration, delay)
  const configs: Record<
    string,
    {
      pos: string;
      size: string;
      bg: string;
      dur: number;
      delay: number;
      path: { x: number[]; y: number[]; scale: number[] };
    }[]
  > = {
    a: [
      {
        pos: "-top-24 -left-24",
        size: "h-[520px] w-[520px]",
        bg: "bg-primary/25",
        dur: 18,
        delay: 0,
        path: { x: [0, 60, -30, 0], y: [0, 40, -20, 0], scale: [1, 1.15, 0.95, 1] },
      },
      {
        pos: "top-1/3 -right-32",
        size: "h-[460px] w-[460px]",
        bg: "bg-white/[0.08]",
        dur: 22,
        delay: 1.2,
        path: { x: [0, -50, 30, 0], y: [0, 30, -30, 0], scale: [1, 1.1, 1, 1] },
      },
      {
        pos: "bottom-[-10%] left-1/4",
        size: "h-[380px] w-[380px]",
        bg: "bg-primary-soft/15",
        dur: 26,
        delay: 0.6,
        path: { x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.98, 1] },
      },
    ],
    b: [
      {
        pos: "-top-20 right-[-10%]",
        size: "h-[440px] w-[440px]",
        bg: "bg-white/[0.09]",
        dur: 20,
        delay: 0,
        path: { x: [0, -40, 30, 0], y: [0, 30, -20, 0], scale: [1, 1.12, 1, 1] },
      },
      {
        pos: "bottom-[-15%] -left-16",
        size: "h-[500px] w-[500px]",
        bg: "bg-primary/20",
        dur: 24,
        delay: 1.5,
        path: { x: [0, 50, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] },
      },
      {
        pos: "top-1/2 left-1/2",
        size: "h-[300px] w-[300px]",
        bg: "bg-primary-soft/10",
        dur: 28,
        delay: 0.8,
        path: { x: [0, -30, 40, 0], y: [0, 30, -20, 0], scale: [1, 1.15, 1, 1] },
      },
    ],
    c: [
      {
        pos: "-top-28 left-1/3",
        size: "h-[480px] w-[480px]",
        bg: "bg-primary/22",
        dur: 21,
        delay: 0.4,
        path: { x: [0, 40, -30, 0], y: [0, 20, -20, 0], scale: [1, 1.12, 0.98, 1] },
      },
      {
        pos: "bottom-[-8%] right-[-8%]",
        size: "h-[420px] w-[420px]",
        bg: "bg-white/[0.08]",
        dur: 25,
        delay: 0,
        path: { x: [0, -40, 20, 0], y: [0, -20, 30, 0], scale: [1, 1.1, 1, 1] },
      },
    ],
    d: [
      {
        pos: "-top-24 right-[-8%]",
        size: "h-[520px] w-[520px]",
        bg: "bg-primary/25",
        dur: 22,
        delay: 0,
        path: { x: [0, -50, 30, 0], y: [0, 40, -30, 0], scale: [1, 1.14, 0.98, 1] },
      },
      {
        pos: "bottom-[-10%] left-1/3",
        size: "h-[420px] w-[420px]",
        bg: "bg-white/[0.07]",
        dur: 26,
        delay: 1,
        path: { x: [0, 40, -30, 0], y: [0, -30, 20, 0], scale: [1, 1.12, 1, 1] },
      },
      {
        pos: "top-1/4 -left-24",
        size: "h-[360px] w-[360px]",
        bg: "bg-primary-soft/12",
        dur: 30,
        delay: 0.6,
        path: { x: [0, 30, -20, 0], y: [0, 30, -20, 0], scale: [1, 1.1, 0.95, 1] },
      },
    ],
  };

  const blobs = configs[variant];
  const { reduced } = useMotionPreference();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.pos} ${b.size} ${b.bg}`}
          animate={reduced ? undefined : b.path}
          transition={
            reduced
              ? undefined
              : {
                  duration: b.dur,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: b.delay,
                }
          }
          style={reduced ? { opacity: 0.5 } : undefined}
        />
      ))}
    </div>
  );
}




/* -------------------------------------------------------------------------- */

function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 md:px-10">
        <a href="#top" data-cursor="Home" className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-lg font-semibold tracking-tight">
            Goody Tech
          </span>
        </a>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-sm text-muted-foreground md:flex"
        >
          {links.map((l) => (
            <a
              key={l.href}
              data-cursor=""
              href={l.href}
              className="hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            data-cursor="Say hi"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-6 mt-2 rounded-2xl border border-border bg-card/95 p-4 shadow-[var(--shadow-lift)] backdrop-blur md:hidden"
          >
            <ul className="flex flex-col divide-y divide-border/60 text-base">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={close}
                    className="block py-3 text-foreground hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={close}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Logo() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
      <span className="font-display text-sm font-semibold">G</span>
    </span>
  );
}

/* --------------------------------- HERO ----------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { damping: 25, stiffness: 120 });
  const py = useSpring(my, { damping: 25, stiffness: 120 });
  const imgX = useTransform(px, (v) => v * 14);
  const imgY = useTransform(py, (v) => v * 14);
  const glowX = useTransform(px, (v) => v * -22);
  const glowY = useTransform(py, (v) => v * -22);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const rx = (e.clientX - r.left) / r.width - 0.5;
      const ry = (e.clientY - r.top) / r.height - 0.5;
      mx.set(rx);
      my.set(ry);
    };
    const off = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", on);
    el.addEventListener("mouseleave", off);
    return () => {
      el.removeEventListener("mousemove", on);
      el.removeEventListener("mouseleave", off);
    };
  }, [mx, my]);

  const lines = [
    "Goody Tech is a creative studio for",
    "graphic design, brand identity and",
    "premium printing — built to help",
    "modern businesses stand out.",
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden pt-32 md:pt-40"
    >
      <FloatingGradients variant="a" />
      {/* Splash of white */}
      <div className="pointer-events-none absolute -top-10 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute right-[-8%] top-1/3 h-[280px] w-[280px] rounded-full bg-white/[0.06] blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 pb-24 md:px-10 md:pb-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20">
        {/* Left: Text — appears above image on mobile */}
        <div className="order-1 lg:order-1">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Creative Designs · Premium Prints
          </motion.div>

          <div className="mb-4 font-display text-xl italic text-primary-soft md:text-2xl">
            <TypeWriter text="Hi, welcome to Goody Tech" startDelay={2.0} />
          </div>

          <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
            <RevealLine delay={0.1}>Creative Designs.</RevealLine>
            <RevealLine delay={0.25}>
              Premium <span className="text-primary italic">Prints.</span>
            </RevealLine>
          </h1>

          <div className="mt-8 max-w-xl space-y-2 text-lg text-muted-foreground md:text-xl">
            {lines.map((l, i) => (
              <RevealLine key={i} delay={0.5 + i * 0.12} className="block">
                {l}
              </RevealLine>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#contact" data-cursor="Let's talk">
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <a
              href="#services"
              data-cursor="Explore"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
            >
              Explore services
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>

          <div className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
            <Stat n="120+" l="Projects shipped" />
            <Stat n="60+" l="Happy brands" />
            <Stat n="8 yrs" l="Studio craft" />
          </div>
        </div>

        {/* Right: Portrait */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative order-2 mx-auto w-full max-w-md lg:order-2 lg:mx-0 lg:ml-auto"
        >
          {/* Floating animated gradient backdrop */}
          <motion.div
            aria-hidden
            style={{ x: glowX, y: glowY }}
            className="pointer-events-none absolute -inset-10 -z-10"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.08, 1],
              }}
              transition={{
                rotate: { duration: 22, ease: "linear", repeat: Infinity },
                scale: { duration: 8, ease: "easeInOut", repeat: Infinity },
              }}
              className="absolute inset-0 rounded-[3rem] opacity-80 blur-3xl"
              style={{
                background:
                  "conic-gradient(from 120deg at 50% 50%, color-mix(in oklab, var(--color-primary) 55%, transparent), color-mix(in oklab, white 30%, transparent), color-mix(in oklab, var(--color-primary) 40%, transparent), transparent 75%)",
              }}
            />
            <motion.div
              animate={{
                x: [0, 24, -12, 0],
                y: [0, -18, 14, 0],
              }}
              transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
              className="absolute -left-6 top-6 h-40 w-40 rounded-full bg-primary/40 blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -20, 16, 0],
                y: [0, 22, -10, 0],
              }}
              transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
              className="absolute -right-4 bottom-4 h-44 w-44 rounded-full bg-white/25 blur-3xl"
            />
          </motion.div>
          <motion.div
            style={{ x: imgX, y: imgY }}
            className="relative"
          >
            <img
              src={founder}
              alt="Cutout portrait of the founder of Goody Tech"
              width={912}
              height={1104}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="relative z-10 h-auto w-full select-none object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
              draggable={false}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card/90 px-5 py-4 backdrop-blur md:block"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Founder
            </div>
            <div className="mt-1 font-display text-base font-semibold text-foreground">
              Studio-led. Craft-first.
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Marquee />
    </section>
  );
}

function TypeWriter({
  text,
  startDelay = 0,
  typeSpeed = 60,
  deleteSpeed = 35,
  holdMs = 1600,
  pauseMs = 500,
}: {
  text: string;
  startDelay?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdMs?: number;
  pauseMs?: number;
}) {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "hold" | "deleting" | "pause">(
    "idle"
  );

  useEffect(() => {
    const s = setTimeout(() => setPhase("typing"), startDelay * 1000);
    return () => clearTimeout(s);
  }, [startDelay]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (i < text.length) {
        t = setTimeout(() => setI((v) => v + 1), typeSpeed);
      } else {
        t = setTimeout(() => setPhase("hold"), 0);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("deleting"), holdMs);
    } else if (phase === "deleting") {
      if (i > 0) {
        t = setTimeout(() => setI((v) => v - 1), deleteSpeed);
      } else {
        t = setTimeout(() => setPhase("pause"), 0);
      }
    } else if (phase === "pause") {
      t = setTimeout(() => setPhase("typing"), pauseMs);
    }
    return () => clearTimeout(t);
  }, [phase, i, text.length, typeSpeed, deleteSpeed, holdMs, pauseMs]);

  return (
    <span aria-label={text} className="inline-flex items-center">
      <span>{text.slice(0, i)}</span>
      <span className="caret-blink ml-1 inline-block h-[1em] w-[2px] translate-y-[3px] bg-primary" />
    </span>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold text-foreground">{n}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
        {l}
      </div>
    </div>
  );
}

function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function MagneticButton({
  children,
  href,
  "data-cursor": dataCursor,
}: {
  children: React.ReactNode;
  href: string;
  "data-cursor"?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 15, stiffness: 200 });
  const sy = useSpring(y, { damping: 15, stiffness: 200 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
      y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
    };

    const leave = () => {
      x.set(0);
      y.set(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[0_20px_60px_-20px_var(--color-primary)]"
      data-cursor={dataCursor}
    >
      {children}
    </motion.a>
  );
}

function Marquee() {
  const words = [
    "Branding",
    "Print",
    "Identity",
    "Editorial",
    "Signage",
    "Apparel",
    "Packaging",
    "Foil",
    "Letterpress",
  ];
  const items = [...words, ...words];
  return (
    <div className="border-y border-border bg-secondary/40 py-6">
      <div className="flex overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center gap-12 whitespace-nowrap pr-12">
          {items.map((w, i) => (
            <span
              key={i}
              className="font-display text-2xl italic text-muted-foreground md:text-3xl"
            >
              {w} <span className="mx-6 text-primary">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- SERVICES --------------------------------- */

function ServicesSection({
  active,
  showProjects,
  onSelect,
  registerRef,
}: {
  active: ServiceId | null;
  showProjects: boolean;
  onSelect: (id: ServiceId) => void;
  registerRef: (id: ServiceId, el: HTMLButtonElement | null) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Autoplay: gently scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      if (!paused && !showProjects) {
        el.scrollLeft += dt * 0.03;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, showProjects]);

  // Drag
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startScroll = 0;
    const md = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const mm = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const mu = () => {
      down = false;
    };
    el.addEventListener("pointerdown", md);
    el.addEventListener("pointermove", mm);
    el.addEventListener("pointerup", mu);
    el.addEventListener("pointercancel", mu);
    return () => {
      el.removeEventListener("pointerdown", md);
      el.removeEventListener("pointermove", mm);
      el.removeEventListener("pointerup", mu);
      el.removeEventListener("pointercancel", mu);
    };
  }, []);

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section id="services" className="relative overflow-hidden py-28 md:py-36">
      <FloatingGradients variant="b" />

      <div className="pointer-events-none absolute left-[-8%] top-16 h-[320px] w-[320px] rounded-full bg-white/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[-6%] h-[260px] w-[260px] rounded-full bg-white/[0.04] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              — What we do
            </div>
            <h2 className="font-display max-w-2xl text-4xl leading-tight md:text-6xl">
              Services crafted for brands
              <br /> that <span className="italic text-primary">refuse to blend in.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <IconButton onClick={() => scrollBy(-1)} label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </IconButton>
            <IconButton onClick={() => scrollBy(1)} label="Next">
              <ChevronRight className="h-5 w-5" />
            </IconButton>
          </div>
        </div>

        <p className="mt-6 max-w-md text-sm text-muted-foreground">
          Tap a service to instantly see the projects we've delivered in that
          discipline.
        </p>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="scrollbar-none mt-14 flex gap-6 overflow-x-auto scroll-smooth px-6 pb-6 md:px-10"
        style={{ scrollbarWidth: "none" }}
      >
        {SERVICES.map((s, i) => {
          const Icon = SERVICE_ICONS[s.id];
          const isActive = active === s.id;
          return (
            <motion.button
              key={s.id}
              ref={(el) => registerRef(s.id, el)}
              onClick={() => onSelect(s.id)}
              data-cursor="View"
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              animate={{
                opacity: showProjects && !isActive ? 0.35 : 1,
                scale: isActive ? (showProjects ? 1.04 : 1.02) : 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                layout: { type: "spring", damping: 26, stiffness: 220 },
              }}
              whileHover={{ y: -8 }}
              className={`group relative flex min-h-[360px] w-[300px] shrink-0 flex-col justify-between rounded-3xl border p-7 text-left transition-colors md:w-[340px] ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-lift)]"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-service-ring"
                  className="pointer-events-none absolute -inset-1 rounded-[1.75rem] ring-2 ring-primary/60"
                  transition={{ type: "spring", damping: 26, stiffness: 220 }}
                />
              )}
              <div>
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    isActive ? "bg-primary-foreground/15" : "bg-primary-soft"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      isActive ? "text-primary-foreground" : "text-primary"
                    }`}
                  />
                </div>
                <div
                  className={`mt-6 text-xs uppercase tracking-widest ${
                    isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  0{i + 1} / {String(SERVICES.length).padStart(2, "0")}
                </div>
                <h3 className="font-display mt-3 text-2xl leading-tight">
                  {s.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    isActive
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {s.description}
                </p>
              </div>
              <div
                className={`mt-8 inline-flex items-center gap-2 text-sm font-medium ${
                  isActive ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {isActive ? (showProjects ? "Showing projects" : "Selected") : "See projects"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.button>
          );
        })}
        <div className="w-6 shrink-0" />
      </div>
    </section>
  );
}

function IconButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      data-cursor=""
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
    >
      {children}
    </button>
  );
}

/* -------------------------------- PROJECTS -------------------------------- */

function ProjectsSection({
  service,
  projects,
  loading,
  onOpen,
  onBack,
}: {
  service: ServiceId;
  projects: Project[];
  loading: boolean;
  onOpen: (p: Project) => void;
  onBack: () => void;
}) {
  const svc = SERVICES.find((s) => s.id === service)!;
  return (
    <motion.section
      id="work"
      initial={{ opacity: 0, y: 60, clipPath: "inset(8% 0% 8% 0% round 32px)" }}
      animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      exit={{ opacity: 0, y: 40, clipPath: "inset(10% 0% 10% 0% round 32px)" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden bg-secondary/40 py-28 md:py-36"
    >
      <FloatingGradients variant="c" />
      {/* Splash of white */}

      <div className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-white/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-[360px] w-[360px] rounded-full bg-white/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            data-cursor="Back"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to services
          </button>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              — Featured work
            </div>
            <motion.h2
              key={svc.id}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              className="font-display max-w-2xl text-4xl leading-tight md:text-6xl"
            >
              Projects in{" "}
              <span className="italic text-primary">{svc.title}</span>
            </motion.h2>
          </div>
          <div className="max-w-sm text-sm text-muted-foreground">
            {svc.description}
          </div>
        </div>

        {loading ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {Array.from({ length: Math.max(2, projects.length) }).map((_, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card/70"
              >
                <div className="absolute inset-0 shimmer-line opacity-40" />
              </div>
            ))}
            <div className="col-span-full mt-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="preloader-orbit inline-block h-3 w-3 rounded-full border-2 border-transparent border-t-primary border-r-primary/40" />
              Loading {svc.title.toLowerCase()} projects
            </div>
          </div>
        ) : (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.08 }}
            className="mt-14 grid gap-6 md:grid-cols-2"
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={onOpen} />
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.button
      onClick={() => onOpen(project)}
      data-cursor="Open"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl bg-card text-left shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover"
          initial={{ scale: 1.05 }}
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-background/90 px-4 py-3 backdrop-blur">
          <div>
            <div className="font-display text-base font-semibold">
              {project.title}
            </div>
            <div className="text-xs text-muted-foreground">
              {project.services.join(" · ")}
            </div>
          </div>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </div>
    </motion.button>
  );
}

/* ---------------------------- PROJECT MODAL ------------------------------- */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-md md:p-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-background shadow-[var(--shadow-lift)]"
      >
        <button
          onClick={onClose}
          data-cursor="Close"
          aria-label="Close"
          className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-0 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="bg-secondary/60">
            {project.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${project.title} preview ${i + 1}`}
                loading="lazy"
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
              />
            ))}
          </div>
          <div className="flex flex-col justify-between gap-8 p-8 md:p-12">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {SERVICES.find((s) => s.id === project.service)?.title}
              </div>
              <h3 className="font-display mt-3 text-3xl leading-tight md:text-4xl">
                {project.title}
              </h3>
              <p className="mt-5 text-muted-foreground">{project.description}</p>

              <div className="mt-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Services provided
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-xs"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <a
              href="#contact"
              data-cursor="Say hi"
              className="inline-flex items-center justify-between gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground"
              onClick={onClose}
            >
              Start a project like this
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* --------------------------------- FOOTER --------------------------------- */

const WHATSAPP_NUMBER = "2349041634458";
const CONTACT_EMAIL = "hello@goodytech.co";

function ProjectInquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState<string>(SERVICES[0].title);
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const canSend = name.trim().length > 1 && message.trim().length > 3;

  const buildBody = () => {
    return [
      `Hi Goody Tech,`,
      ``,
      `My name is ${name || "—"}.`,
      email ? `Email: ${email}` : "",
      `Project type: ${projectType}`,
      budget ? `Budget: ${budget}` : "",
      ``,
      `Project details:`,
      message,
      ``,
      `— Sent from goodytech.co`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const subject = `New project inquiry — ${projectType}${name ? ` (${name})` : ""}`;

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody())}`;
    window.location.href = url;
  };

  const handleWhatsApp = () => {
    if (!canSend) return;
    const text = `*${subject}*\n\n${buildBody()}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.form
      onSubmit={handleEmail}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12 rounded-3xl border border-primary-soft/15 bg-white/[0.04] p-6 backdrop-blur-sm md:mt-16 md:p-10"
      aria-label="Project inquiry form"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your name" htmlFor="pi-name">
          <input
            id="pi-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
            data-cursor=""
            className="w-full rounded-xl border border-primary-soft/20 bg-transparent px-4 py-3 text-primary-soft placeholder:text-primary-soft/40 outline-none transition focus:border-primary-soft/70 focus:ring-2 focus:ring-primary-soft/20"
          />
        </Field>
        <Field label="Email (optional)" htmlFor="pi-email">
          <input
            id="pi-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@studio.com"
            data-cursor=""
            className="w-full rounded-xl border border-primary-soft/20 bg-transparent px-4 py-3 text-primary-soft placeholder:text-primary-soft/40 outline-none transition focus:border-primary-soft/70 focus:ring-2 focus:ring-primary-soft/20"
          />
        </Field>
        <Field label="Project type" htmlFor="pi-type">
          <select
            id="pi-type"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            data-cursor=""
            className="w-full rounded-xl border border-primary-soft/20 bg-ink px-4 py-3 text-primary-soft outline-none transition focus:border-primary-soft/70 focus:ring-2 focus:ring-primary-soft/20"
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.title} className="bg-ink text-primary-soft">
                {s.title}
              </option>
            ))}
            <option value="Something else" className="bg-ink text-primary-soft">
              Something else
            </option>
          </select>
        </Field>
        <Field label="Budget (optional)" htmlFor="pi-budget">
          <input
            id="pi-budget"
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="$500 – $2k"
            data-cursor=""
            className="w-full rounded-xl border border-primary-soft/20 bg-transparent px-4 py-3 text-primary-soft placeholder:text-primary-soft/40 outline-none transition focus:border-primary-soft/70 focus:ring-2 focus:ring-primary-soft/20"
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="Tell us about your project" htmlFor="pi-message">
            <textarea
              id="pi-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What are you building? Timeline, quantities, style references…"
              data-cursor=""
              className="w-full resize-none rounded-xl border border-primary-soft/20 bg-transparent px-4 py-3 text-primary-soft placeholder:text-primary-soft/40 outline-none transition focus:border-primary-soft/70 focus:ring-2 focus:ring-primary-soft/20"
            />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-primary-soft/50">
          Pick your channel — your message opens pre-filled, ready to send.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={!canSend}
            data-cursor="Email"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-primary-soft/30 px-6 py-3 text-sm font-medium text-primary-soft transition hover:bg-primary-soft hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Mail className="h-4 w-4" />
            Send via Email
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={handleWhatsApp}
            disabled={!canSend}
            data-cursor="WhatsApp"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-[#062e14] transition hover:bg-[#1ebe5a] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Send via WhatsApp
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-primary-soft/60">
        {label}
      </span>
      {children}
    </label>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.83 11.83 0 0 0 5.65 1.44h.01c6.55 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.15-3.49-8.43ZM12.06 21.6h-.01a9.75 9.75 0 0 1-4.97-1.36l-.36-.21-3.8 1 1.02-3.7-.24-.38a9.76 9.76 0 0 1-1.5-5.1c0-5.4 4.4-9.8 9.86-9.8 2.63 0 5.11 1.03 6.97 2.9a9.77 9.77 0 0 1 2.89 6.96c0 5.4-4.4 9.79-9.86 9.79Zm5.4-7.32c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46 0 1.45 1.06 2.85 1.2 3.05.15.2 2.08 3.17 5.04 4.45.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.11.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const o = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-ink text-primary-soft"
    >
      <FloatingGradients variant="d" />
      <div className="pointer-events-none absolute -top-24 right-[-8%] h-[420px] w-[420px] rounded-full bg-white/[0.06] blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-6%] left-1/3 h-[320px] w-[320px] rounded-full bg-white/[0.04] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <motion.div style={{ y, opacity: o }}>
          <div className="text-xs uppercase tracking-[0.25em] text-primary-soft/60">
            — Let's build something memorable
          </div>
          <h2 className="font-display mt-6 text-5xl leading-[1.05] md:text-8xl">
            Have a project
            <br />
            <span className="italic text-primary-soft">in mind?</span>
          </h2>
          <p className="mt-6 max-w-xl text-base text-primary-soft/70 md:text-lg">
            Tell us about the project — a brand refresh, print run, or a wild idea.
            Send it straight to our inbox or ping us on WhatsApp.
          </p>
        </motion.div>

        <ProjectInquiryForm />

        <div className="mt-20 grid gap-10 border-t border-primary-soft/10 pt-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="font-display text-sm font-semibold">G</span>
              </span>
              <span className="font-display text-lg font-semibold">
                Goody Tech
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-primary-soft/60">
              Creative Designs. Premium Prints. Powerful Brands.
            </p>
          </div>
          <FooterCol
            title="Navigate"
            links={[
              { label: "About", href: "#about" },
              { label: "Services", href: "#services" },
              { label: "Work", href: "#work" },
              { label: "Contact", href: "#contact" },
            ]}
          />
          <FooterCol
            title="Contact"
            links={[
              { label: "hello@goodytech.co", href: "mailto:hello@goodytech.co" },
              { label: "+1 (555) 010 · 0110", href: "tel:+15550100110" },
              { label: "Studio · By appointment", href: "#" },
            ]}
          />
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary-soft/60">
              Social
            </div>
            <div className="mt-4 flex gap-3">
              <Social icon={<Instagram className="h-4 w-4" />} label="Instagram" />
              <Social icon={<Twitter className="h-4 w-4" />} label="Twitter" />
              <Social icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
              <Social icon={<Mail className="h-4 w-4" />} label="Email" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 text-xs text-primary-soft/50">
          <div>© {new Date().getFullYear()} Goody Tech. All rights reserved.</div>
          <div>Made with craft, in the studio.</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.25em] text-primary-soft/60">
        {title}
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              data-cursor=""
              className="text-primary-soft/85 transition-colors hover:text-primary-soft"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Social({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      data-cursor=""
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-soft/20 transition-colors hover:border-primary-soft hover:bg-primary hover:text-primary-foreground"
    >
      {icon}
    </a>
  );
}

