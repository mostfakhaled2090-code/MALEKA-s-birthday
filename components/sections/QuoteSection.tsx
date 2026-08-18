"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
}

export function QuoteSection() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setMounted(true);

    setParticles(
      Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full min-h-[70vh] py-32 md:py-40 bg-gradient-to-b from-[#3b020b] via-[#250106] to-[#3b020b] overflow-hidden flex items-center justify-center">

      {/* ================================================================ */}
      {/* AMBIENT GLOW */}
      {/* ================================================================ */}

      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[70vw]
          h-[70vw]
          max-w-[800px]
          max-h-[800px]
          rounded-full
          bg-red-900/20
          blur-[140px]
          pointer-events-none
        "
      />

      {/* Subtle horizontal light */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[80%]
          h-px
          bg-gradient-to-r
          from-transparent
          via-amber-500/10
          to-transparent
          pointer-events-none
        "
      />

      {/* ================================================================ */}
      {/* FLOATING PARTICLES */}
      {/* ================================================================ */}

      {mounted && !shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="
                absolute
                rounded-full
                bg-white/20
                blur-[1px]
              "
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.05, 0.35, 0.05],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* ================================================================ */}
      {/* QUOTE */}
      {/* ================================================================ */}

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 text-center">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-120px",
          }}
          className="relative flex flex-col items-center"
        >

          {/* Giant Background Quote Mark */}

          <motion.div
            variants={itemVariants}
            className="
              absolute
              -top-20
              md:-top-28
              left-1/2
              -translate-x-1/2
              text-[180px]
              md:text-[260px]
              leading-none
              font-serif
              text-amber-400/[0.035]
              select-none
              pointer-events-none
            "
          >
            “
          </motion.div>

          {/* Small Intro */}

          <motion.div
            variants={itemVariants}
            className="mb-10 md:mb-12"
          >
            <div className="flex items-center justify-center gap-4">

              <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent to-amber-500/40" />

              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.45em] text-amber-300/45">
                For You
              </span>

              <div className="w-10 md:w-16 h-px bg-gradient-to-l from-transparent to-amber-500/40" />

            </div>
          </motion.div>

          {/* Main Quote */}

          <motion.blockquote
            variants={itemVariants}
            className="relative max-w-4xl mx-auto"
          >
            <p
              className="
                font-serif
                italic
                font-light
                text-3xl
                md:text-5xl
                lg:text-[4rem]
                leading-[1.35]
                md:leading-[1.3]
                tracking-wide
                text-rose-50/95
              "
              style={{
                textShadow: "0 10px 50px rgba(0,0,0,0.45)",
              }}
            >
              In all the world, there is no heart for me like yours.
            </p>

            <p
              className="
                mt-6
                md:mt-8
                font-serif
                italic
                font-light
                text-3xl
                md:text-5xl
                lg:text-[4rem]
                leading-[1.35]
                md:leading-[1.3]
                tracking-wide
                text-rose-50/95
              "
              style={{
                textShadow: "0 10px 50px rgba(0,0,0,0.45)",
              }}
            >
              In all the world, there is no love for you like mine.
            </p>
          </motion.blockquote>

          {/* ============================================================ */}
          {/* GOLD DIVIDER */}
          {/* ============================================================ */}

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mt-12 md:mt-14 mb-7"
          >
            <div className="w-16 md:w-28 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-amber-500/20" />

            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: [45, 135, 45],
                      scale: [1, 1.15, 1],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                w-2
                h-2
                bg-amber-400
                shadow-[0_0_14px_rgba(251,191,36,0.7)]
                rotate-45
              "
            />

            <div className="w-16 md:w-28 h-px bg-gradient-to-l from-transparent via-amber-500/50 to-amber-500/20" />
          </motion.div>

          {/* Author */}

          <motion.cite
            variants={itemVariants}
            className="
              block
              text-[10px]
              md:text-xs
              text-amber-200/55
              not-italic
              uppercase
              tracking-[0.35em]
              font-medium
            "
          >
            — Maya Angelou
          </motion.cite>

        </motion.div>
      </div>
    </section>
  );
}