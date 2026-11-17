"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { MenuOverlay } from "./menu-overlay";
import { NextStepPanel } from "./next-step-panel";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Top bar: the church's own menu on the left, the logo centred, "Next step" (a side panel, as on
 * the current site) and "Menu" (full-screen) on the right. Clear at the top of the page, frosted
 * once it moves, dark over dark sections (data-nav="dark"). Tucks away reading down, returns going up.
 */
export function Header() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [moved, setMoved] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [step, setStep] = useState(false);

  const checkDark = useCallback(() => {
    const hit = document.elementsFromPoint(window.innerWidth / 2, 38).find((el) => !el.closest("header"));
    setOverDark(!!hit?.closest('[data-nav="dark"]'));
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setMoved(y > 8);
    if (y > 600 && y > prev + 2) setHidden(true);
    else if (y < prev - 2 || y <= 600) setHidden(false);
    checkDark();
  });
  useEffect(() => {
    const id = requestAnimationFrame(checkDark);
    return () => cancelAnimationFrame(id);
  }, [pathname, checkDark]);

  const dark = overDark && !menu;
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500",
          menu
            ? "bg-transparent text-white"
            : dark
              ? "border-b border-white/10 bg-[linear-gradient(180deg,rgba(20,16,13,0.42),rgba(20,16,13,0.22))] text-white shadow-[0_12px_32px_-22px_rgba(0,0,0,0.6)] backdrop-blur-[28px] backdrop-saturate-[1.8]"
              : cn(
                  "border-b border-white/60 bg-[linear-gradient(180deg,rgba(255,253,250,0.55),rgba(255,253,250,0.32))] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-[28px] backdrop-saturate-[1.9]",
                  moved && "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_14px_36px_-24px_rgba(35,29,23,0.35)]"
                )
        )}
        animate={{ y: hidden && !menu && !step ? -96 : 0 }}
        transition={{ duration: 0.45, ease }}
      >
        <div className="container-x grid h-[84px] grid-cols-[1fr_auto] items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <motion.nav aria-label="Main" className="-ml-3 hidden items-center gap-2 lg:flex xl:gap-4" animate={{ opacity: menu ? 0 : 1 }} style={{ pointerEvents: menu ? "none" : "auto" }}>
            {primaryNav.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                aria-current={active(l.href) ? "page" : undefined}
                className={cn(
                  "relative flex h-[84px] items-center px-3 text-[0.95rem] font-medium whitespace-nowrap transition-colors",
                  active(l.href) ? (dark ? "text-cream" : "text-red") : dark ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-ink"
                )}
              >
                {l.label}
                {active(l.href) && <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-current" />}
              </Link>
            ))}
          </motion.nav>

          <Logo onDark={dark || menu} className="lg:justify-self-center" />

          <div className="flex items-center justify-self-end gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setStep(true)}
              aria-haspopup="dialog"
              className={cn(
                "group hidden h-11 items-center gap-2 rounded-full bg-red pr-1.5 pl-5 text-[0.93rem] font-semibold text-white transition-[background-color,opacity] hover:bg-red-dark sm:inline-flex",
                menu && "pointer-events-none opacity-0"
              )}
            >
              Next step
              <span className="grid size-8 place-items-center rounded-full bg-white/15 transition-transform group-hover:rotate-45">
                <ArrowUpRight className="size-4" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-controls="site-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              className={cn(
                "relative z-[90] flex min-h-11 items-center gap-3 rounded-full pr-4 pl-5 text-[0.93rem] font-semibold transition-colors",
                dark || menu ? "bg-white/10 text-white ring-1 ring-white/20 ring-inset hover:bg-white/20" : "bg-night text-white hover:bg-night-soft"
              )}
            >
              <span aria-hidden className="relative block h-5 overflow-hidden">
                <motion.span className="block" animate={{ y: menu ? "-50%" : "0%" }} transition={{ duration: 0.4, ease }}>
                  <span className="block h-5 leading-5">Menu</span>
                  <span className="block h-5 leading-5">Close</span>
                </motion.span>
              </span>
              <span aria-hidden className="relative block h-3 w-5">
                <motion.span className="absolute left-0 h-[2px] w-5 rounded-full bg-current" animate={menu ? { top: 5, rotate: 45 } : { top: 1, rotate: 0 }} transition={{ duration: 0.4, ease }} />
                <motion.span className="absolute right-0 h-[2px] rounded-full bg-glow" animate={menu ? { top: 5, rotate: -45, width: 20 } : { top: 9, rotate: 0, width: 12 }} transition={{ duration: 0.4, ease }} />
              </span>
            </button>
          </div>
        </div>
        {/* how far down the page you are */}
        <motion.span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-red" style={{ scaleX: progress, opacity: menu ? 0 : 1 }} />
      </motion.header>

      <MenuOverlay open={menu} onOpenChange={setMenu} />
      <NextStepPanel open={step} onOpenChange={setStep} />
    </>
  );
}
