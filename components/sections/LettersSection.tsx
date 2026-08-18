"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  type: 'petal' | 'heart';
}

export function LettersSection() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const letterLines = [
    "لأحلى حاجة في حياتي ❤",
    "",

    "وجودك غير فيا حاجات كتير للأحسن",
    "",
    "كل سنة وإنت طيبة وبخير يا حبيبتي",
    "وربنا يديمك في حياتي",
    "ويارب أشوفك دايما مبسوطة وتكوني أسعد حد في الدنيا",
    "",
    "هو اه عيد ميلادك إنت",
    "بس أنا كمان هتمنى أمنية",
    "",
    "بتمنى من ربنا إن في يوم من الأيام أقدر أكون الشخص اللي يستحقك فعلا",
    "وأكون قد ثقة وحب كل الناس اللي بيحبوكي",
    "وربنا يارب يجمعنا في الحلال ويكتب لنا الخير",
    "",
    "بحبك اوي  🤍"
  ];

  useEffect(() => {
    setMounted(true);
    
    const generatedParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      type: Math.random() > 0.5 ? 'petal' : 'heart'
    }));

    setParticles(generatedParticles);
  }, []);

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.5,
      },
    },
  };
  
  const lineVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <section className="relative w-full py-32 min-h-screen bg-gradient-to-b from-rose-950 via-[rgb(60,10,15)] to-rose-950 overflow-hidden flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-3/4 bg-rose-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Particles: Petals & Hearts */}
      {mounted && !shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute text-rose-200/40 select-none"
              style={{
                left: p.left,
                top: p.type === 'petal' ? '-10%' : p.top,
                fontSize: p.size,
              }}
              animate={{
                y: p.type === 'petal' ? ['0vh', '110vh'] : [0, -100, 0],
                x: p.type === 'petal' ? [0, Math.random() * 100 - 50, 0] : [0, Math.random() * 40 - 20, 0],
                opacity: p.type === 'petal' ? [0, 0.6, 0] : [0.1, 0.5, 0.1],
                rotate: p.type === 'petal' ? [0, 360] : [-10, 10, -10],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              }}
            >
              {p.type === 'petal' ? '🌸' : '🤍'}
            </motion.div>
          ))}
        </div>
      )}

      <div className="container px-4 md:px-6 relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="relative p-8 md:p-14 lg:p-16 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-rose-200/10 shadow-2xl overflow-hidden"
        >
          {/* Subtle Paper/Glass Inner Highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
          
          <h3 className="text-rose-200/70 text-center text-sm md:text-base mb-12 tracking-widest font-serif relative z-10">
            A letter for The Most Beautiful Girl in the World ❤
          </h3>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4 md:space-y-6 relative z-10 text-right"
            dir="rtl"
          >
            {letterLines.map((line, index) => (
              <motion.p
                key={index}
                variants={lineVariants}
                className={`text-rose-50/90 font-serif leading-relaxed md:leading-relaxed ${
                  line === "" ? "h-4" : "text-lg md:text-xl lg:text-2xl"
                }`}
              >
                {line}
              </motion.p>
            ))}

            <motion.div 
              variants={lineVariants}
              className="pt-16 pb-4"
              dir="ltr"
            >
              <p className="text-xl md:text-2xl text-amber-200/80 font-serif italic tracking-wide text-left">
               مصطفى
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}