"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const revealVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.6,
      delayChildren: 0.4,
    },
  },
};

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // --------------------------------------------------------------------------
  // PARALLAX LOGIC
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize between -1 and 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#030000] text-white font-sans selection:bg-white/10">
      
      {/* 1. AMBIENT BACKGROUND GLOWS */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,0,0,0.95)_100%)]" />
      
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-red-950/20 blur-[150px] pointer-events-none mix-blend-screen"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 2. STARS & DUST */}
      <Stars mousePos={mousePos} />
      <DustParticles mousePos={mousePos} />

      {/* 3. BACKGROUND PETALS */}
      <RosePetals layer="back" mousePos={mousePos} />

      {/* 4. MAIN CONTENT */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl px-6 py-20 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Heart Icon & Caption */}
        <motion.div variants={revealVariants} className="flex flex-col items-center mb-6">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/40 mb-4 animate-pulse">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <p className="text-xs md:text-sm text-white/50 font-light tracking-[0.3em] uppercase">
            Made Especially For You
          </p>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          variants={revealVariants} 
          className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white/95 mb-6 tracking-wide drop-shadow-2xl leading-tight"
          style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}
        >
          Happy Birthday,<br />
          <span className="font-light italic tracking-wider">Malak.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={revealVariants} 
          className="text-sm md:text-base lg:text-lg text-white/60 font-light tracking-wide mb-14 max-w-xl mx-auto leading-relaxed"
        >
          A day I'll never forget.<br />
          Because today, the most beautiful person in my life celebrates her birthday.
        </motion.p>

        {/* Premium Portrait Photo Container */}
        <motion.div 
          variants={revealVariants}
          className="relative z-30"
          style={{
            transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Floating Animation Wrapper */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72 h-[26rem] md:w-80 md:h-[32rem] lg:w-[26rem] lg:h-[38rem] rounded-[30px] overflow-hidden border border-white/15 bg-white/5 backdrop-blur-sm shadow-[0_0_60px_rgba(153,27,27,0.25)] ring-1 ring-white/5"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 z-10 rounded-[30px] shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none" />
            
            {/* The Image with Ken Burns */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{ 
                scale: [1.05, 1],
                y: [0, -5]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                repeatType: "mirror",
                ease: "easeInOut" 
              }}
            >
              <Image 
                src="/m18.jpeg" 
                alt="Malak" 
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 5. FOREGROUND PETALS */}
      <RosePetals layer="front" mousePos={mousePos} />

      {/* 6. SCROLL INDICATOR */}
      <motion.div 
        className="absolute bottom-10 z-30 flex flex-col items-center justify-center gap-3 cursor-pointer"
        variants={revealVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 font-light">
          Begin Our Journey
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-white/50 opacity-80">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

    </section>
  );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function Stars({ mousePos }: { mousePos: { x: number; y: number } }) {
  const stars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${0.5 + Math.random() * 1.5}px`,
      duration: 3 + Math.random() * 5,
      delay: -(Math.random() * 5),
      opacity: 0.1 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white/70"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ opacity: [s.opacity * 0.2, s.opacity, s.opacity * 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function DustParticles({ mousePos }: { mousePos: { x: number; y: number } }) {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}vw`,
      y: `${Math.random() * 100}vh`,
      size: Math.random() * 3 + 1,
      duration: 20 + Math.random() * 20,
      delay: -(Math.random() * 20),
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/10 blur-[1px]"
          style={{ width: p.size, height: p.size, top: p.y, left: p.x }}
          animate={{
            y: ["-5vh", "5vh"],
            x: ["-2vw", "2vw"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "mirror",
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function RosePetals({ layer, mousePos }: { layer: "front" | "back"; mousePos: { x: number; y: number } }) {
  const petals = useMemo(() => {
    const count = layer === "front" ? 6 : 10;
    const colors = ["#4A0404", "#5C0505", "#2E0000", "#1A0000"];
    
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      xStart: `${Math.random() * 100}vw`,
      xEnd: `${(Math.random() - 0.5) * 40 + 50}vw`,
      size: layer === "front" ? 18 + Math.random() * 20 : 10 + Math.random() * 15,
      delay: -(Math.random() * 40), 
      duration: 25 + Math.random() * 30, // Extremely slow
      rotStart: Math.random() * 360,
      rotEnd: Math.random() * 360 + (Math.random() > 0.5 ? 360 : -360),
      opacity: layer === "front" ? 0.3 + Math.random() * 0.3 : 0.1 + Math.random() * 0.2,
      blur: layer === "front" ? `blur(${Math.random() * 2}px)` : `blur(${3 + Math.random() * 4}px)`,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [layer]);

  const zIndex = layer === "front" ? "z-40" : "z-10";
  const parallaxMultiplier = layer === "front" ? 25 : -15;

  return (
    <div 
      className={`fixed inset-0 ${zIndex} pointer-events-none overflow-hidden`}
      style={{
        transform: `translate(${mousePos.x * parallaxMultiplier}px, ${mousePos.y * parallaxMultiplier}px)`,
        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-10vh", x: p.xStart, rotate: p.rotStart }}
          animate={{ y: "110vh", x: p.xEnd, rotate: p.rotEnd }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: p.blur,
            color: p.color,
          }}
        >
          <svg viewBox="0 0 25 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
            <path d="M2.203 14.618C1.527 10.222 3.86 4.75 9.074 2.115C14.288 -0.52 20.334 -0.06 22.84 3.73C25.346 7.52 24.3 14.264 21.01 19.34C17.72 24.416 11.23 28.182 6.845 25.8C2.46 23.418 2.88 19.014 2.203 14.618Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}