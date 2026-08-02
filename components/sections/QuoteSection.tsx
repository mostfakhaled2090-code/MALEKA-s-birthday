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
    // Generate particles only on the client to prevent hydration mismatches
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
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full py-32 min-h-[70vh] bg-gradient-to-b from-rose-950 via-[rgb(60,10,15)] to-rose-950 overflow-hidden flex items-center justify-center">
      {/* Soft central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-3/4 bg-rose-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating particles */}
      {mounted && !shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-rose-200/30 shadow-[0_0_10px_2px_rgba(254,205,211,0.2)]"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.1, 0.6, 0.1],
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

      <div className="container px-4 md:px-6 relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative p-8 md:p-16 lg:p-20 rounded-3xl bg-white/5 backdrop-blur-xl border border-rose-200/10 shadow-2xl overflow-hidden"
        >
          {/* Subtle inner glass highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

          {/* Decorative corner accents */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-amber-500/40 rounded-tl-lg opacity-70" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-amber-500/40 rounded-tr-lg opacity-70" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-amber-500/40 rounded-bl-lg opacity-70" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-amber-500/40 rounded-br-lg opacity-70" />

          <motion.div variants={itemVariants} className="mb-8">
            <span className="text-6xl md:text-8xl text-amber-500/30 leading-none block h-10 md:h-14 font-serif">
              "
            </span>
          </motion.div>

          <motion.blockquote variants={itemVariants} className="space-y-6 relative z-10">
            <p className="text-2xl md:text-4xl lg:text-5xl text-rose-50 leading-relaxed md:leading-relaxed lg:leading-relaxed font-serif italic font-light tracking-wide">
              In all the world, there is no heart for me like yours.
              <br className="hidden md:block my-2" />
              In all the world, there is no love for you like mine.
            </p>
          </motion.blockquote>

          {/* Gold Decorative Divider */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center justify-center gap-4 mt-12 mb-8"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-20 md:w-32" />
            <div className="w-2 h-2 rotate-45 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-20 md:w-32" />
          </motion.div>

          <motion.cite 
            variants={itemVariants} 
            className="block text-sm md:text-base lg:text-lg text-amber-200/80 not-italic uppercase tracking-widest font-semibold"
          >
            — Maya Angelou
          </motion.cite>
        </motion.div>
      </div>
    </section>
  );
}