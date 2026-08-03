"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/**
 * Local palette — deep burgundy / dark wine, consistent with the
 * cinematic treatment established in HeroSection and LoadingScreen.
 */
const COLORS = {
  bg: "#2B000A", // Deep Burgundy
  wine: "#3D0018", // Dark Wine
  wineDeep: "#1A0007", // Deeper Wine / near-black
  crimson: "#8B001E", // Crimson
  rose: "#FF4D6D", // Rose
  ivory: "#FFF8F8", // Ivory
  gold: "#D4AF37", // Soft Gold
} as const;

const STARS = Array.from({ length: 46 }, (_, index) => ({
  id: index,
  left: `${((index * 47 + 5) % 98) + 1}%`,
  top: `${((index * 31 + 13) % 78) + 2}%`,
  size: (index % 3) + 1,
  duration: 3 + (index % 5),
  delay: (index % 10) * 0.4,
}));

const GOLD_PARTICLES = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${((index * 53 + 17) % 96) + 2}%`,
  top: `${((index * 29 + 21) % 90) + 4}%`,
  size: (index % 3) + 3,
  duration: 16 + (index % 10),
  delay: (index % 8) * 0.7,
  driftX: (index % 2 === 0 ? 1 : -1) * (10 + (index % 6)),
  driftY: -18 - (index % 8),
}));

const NEBULAE = [
  {
    top: "-8%",
    left: "8%",
    size: "48rem",
    color: "rgba(139, 0, 30, 0.32)",
    duration: 34,
    driftX: 28,
    driftY: 14,
  },
  {
    top: "18%",
    left: "62%",
    size: "40rem",
    color: "rgba(212, 175, 55, 0.14)",
    duration: 40,
    driftX: -22,
    driftY: 20,
  },
  {
    top: "55%",
    left: "-6%",
    size: "44rem",
    color: "rgba(255, 77, 109, 0.16)",
    duration: 38,
    driftX: 20,
    driftY: -16,
  },
] as const;

export function NightSkySection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const moonParallax = useTransform(scrollYProgress, [0, 1], [-36, 36]);
  const nebulaParallax = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const starsParallax = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <section
      ref={sectionRef}
      data-section="night-sky"
      className={`${playfair.className} relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-20 sm:px-8 sm:py-24`}
      style={{ backgroundColor: COLORS.bg }}
    >
      {/* Base night gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, ${COLORS.wineDeep} 0%, ${COLORS.wine} 32%, ${COLORS.bg} 62%, ${COLORS.wineDeep} 100%),
            radial-gradient(ellipse 80% 55% at 50% 0%, rgba(61, 0, 24, 0.6) 0%, transparent 65%)
          `,
        }}
      />

      {/* Slow-moving nebula clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {NEBULAE.map((nebula, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full blur-[110px]"
            style={{
              top: nebula.top,
              left: nebula.left,
              width: nebula.size,
              height: nebula.size,
              background: `radial-gradient(circle, ${nebula.color} 0%, transparent 70%)`,
              y: prefersReducedMotion ? 0 : nebulaParallax,
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    x: [0, nebula.driftX, 0],
                    y: [0, nebula.driftY, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.55, 0.85, 0.55],
                  }
            }
            transition={{
              duration: nebula.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 2,
            }}
          />
        ))}
      </div>

      {/* Soft moon glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[8%] left-1/2 -translate-x-1/2"
        style={{ y: prefersReducedMotion ? 0 : moonParallax }}
      >
        <motion.div
          className="relative h-28 w-28 rounded-full sm:h-36 sm:w-36"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${COLORS.ivory} 0%, ${COLORS.gold} 55%, transparent 78%)`,
            boxShadow: `
              0 0 60px rgba(212, 175, 55, 0.45),
              0 0 140px rgba(212, 175, 55, 0.25),
              0 0 220px rgba(255, 248, 248, 0.12)
            `,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : { scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Animated twinkling stars */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ y: prefersReducedMotion ? 0 : starsParallax }}
      >
        {STARS.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              background: COLORS.ivory,
              boxShadow: `0 0 ${star.size * 3}px rgba(255, 248, 248, 0.6)`,
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : { opacity: [0.15, 1, 0.15], scale: [0.8, 1.3, 0.8] }
            }
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Floating golden particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {GOLD_PARTICLES.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full will-change-transform"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, ${COLORS.gold} 0%, transparent 70%)`,
              boxShadow: `0 0 ${particle.size * 3}px rgba(212, 175, 55, 0.5)`,
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, particle.driftY, 0],
                    x: [0, particle.driftX, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.3, 1],
                  }
            }
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Elegant ambient lighting + vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 75% 70% at 50% 50%, transparent 40%, rgba(26, 0, 7, 0.65) 78%, rgba(26, 0, 7, 0.95) 100%)
          `,
        }}
      />

      {/* Ambient content */}
      <motion.div
        className="relative z-10 mx-auto max-w-xl text-center"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.2, ease: "easeOut" }}      >
        <motion.div
          aria-hidden
          className="mx-auto mb-6 h-px w-16"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6), transparent)`,
          }}
          initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        />

        <motion.p
          className="text-[clamp(1.25rem,3.2vw,1.75rem)] leading-relaxed font-normal italic"
          style={{ color: COLORS.ivory }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
        >
          &ldquo;Even the stars pause to admire you.&rdquo;
        </motion.p>
      </motion.div>
    </section>
  );
}