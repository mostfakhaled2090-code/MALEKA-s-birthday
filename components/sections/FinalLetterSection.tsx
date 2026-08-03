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

export function FinalLetterSection() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 6 + 4,
        delay: Math.random() * 5,
        duration: Math.random() * 15 + 15,
      }))
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 1.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-rose-950 via-[rgb(30,5,8)] to-black overflow-hidden flex items-center justify-center py-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-[400px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      {mounted && !shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-amber-200/20 shadow-[0_0_12px_2px_rgba(253,230,138,0.15)]"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="container px-4 md:px-8 relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-rose-200/10 p-10 md:p-16 lg:p-20 text-center shadow-[0_0_50px_-15px_rgba(0,0,0,0.8)]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

          <motion.div variants={itemVariants} className="mb-12 md:mb-16">
            <p className="text-amber-400/80 text-xs md:text-sm tracking-[0.3em] uppercase font-light">
              One Last Thing...
            </p>
            <div className="w-12 h-px bg-amber-500/30 mx-auto mt-4" />
          </motion.div>

          <div className="space-y-12 md:space-y-16 font-serif text-xl md:text-2xl lg:text-3xl text-rose-100/90 leading-relaxed md:leading-loose">
            <motion.div variants={itemVariants} className="space-y-2">
              <p>No matter where life takes us</p>
              <p>I just want you to know</p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <p>Seeing you happy was one of the best things</p>
              <p>that ever happened to me</p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 md:pt-8">
              <h2 className="text-3xl md:text-5xl lg:text-6xl text-amber-300 font-medium tracking-wide drop-shadow-[0_0_15px_rgba(252,211,77,0.3)]">
                Happy Birthday MALLOKI❤
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-8 flex flex-col items-center gap-8"
            >
              <p className="text-2xl md:text-4xl text-rose-50 tracking-wider">
                I love you 🤍
              </p>

              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: [1, 1.15, 1],
                        boxShadow: [
                          "0 0 20px rgba(244,63,94,0.2)",
                          "0 0 40px rgba(244,63,94,0.4)",
                          "0 0 20px rgba(244,63,94,0.2)",
                        ],
                      }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-rose-950/40 flex items-center justify-center border border-rose-500/20 backdrop-blur-md"
              >
                <span className="text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                  🤍
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}