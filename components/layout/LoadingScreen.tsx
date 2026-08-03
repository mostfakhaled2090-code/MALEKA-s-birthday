"use client";

import React, { useState, useEffect, useMemo, ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ============================================================================
// CONFIGURATION
// ============================================================================
const UNLOCK_DATE = new Date("2026-08-19T00:00:00").getTime();

interface LoadingScreenProps {
  children: ReactNode;
}

export default function LoadingScreen({ children }: LoadingScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // --------------------------------------------------------------------------
  // TIME & MOUNT & MOBILE LOGIC
  // --------------------------------------------------------------------------
  useEffect(() => {
    setMounted(true);

    // Check if device is mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const calculateTime = () => {
      const now = Date.now();
      const diff = UNLOCK_DATE - now;
      setTimeLeft(diff > 0 ? diff : 0);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // --------------------------------------------------------------------------
  // MOUSE PARALLAX LOGIC
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (isMobile) return; // Disable mouse parallax on mobile to save performance

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // --------------------------------------------------------------------------
  // RENDER ROUTING
  // --------------------------------------------------------------------------
  if (!mounted) return <div className="min-h-screen bg-[#030000]" />; 

  if (timeLeft <= 0) return <>{children}</>;

  // --------------------------------------------------------------------------
  // TIME CALCULATIONS
  // --------------------------------------------------------------------------
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050101] text-white flex flex-col items-center justify-center font-sans selection:bg-white/10">
      
      {/* INJECTED CSS FOR PREMIUM ANIMATIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInStagger {
          0% { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes twinkleStar {
          0%, 100% { opacity: var(--min-opacity); transform: scale(0.8); }
          50% { opacity: var(--max-opacity); transform: scale(1.2); }
        }
        .animate-stagger-1 { animation: fadeInStagger 2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; opacity: 0; }
        .animate-stagger-2 { animation: fadeInStagger 2s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards; opacity: 0; }
        .animate-stagger-3 { animation: fadeInStagger 2s cubic-bezier(0.16, 1, 0.3, 1) 1.9s forwards; opacity: 0; }
        .animate-stagger-4 { animation: fadeInStagger 2s cubic-bezier(0.16, 1, 0.3, 1) 2.6s forwards; opacity: 0; }
        .animate-stagger-5 { animation: fadeInStagger 2s cubic-bezier(0.16, 1, 0.3, 1) 3.3s forwards; opacity: 0; }
        .animate-stagger-6 { animation: fadeInStagger 2s cubic-bezier(0.16, 1, 0.3, 1) 4.0s forwards; opacity: 0; }
        
        .number-slide {
          animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* 1. SOFT VIGNETTE & AMBIENT CENTER GLOW */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_10%,rgba(2,0,0,0.85)_100%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[70vw] h-[90vw] md:h-[70vw] rounded-full bg-red-900/15 md:blur-[120px] blur-[80px] pointer-events-none z-0 md:mix-blend-screen" />

      {/* 2. DYNAMIC BACKGROUND BLOBS */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-[2000ms] ease-out"
        style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-[50vw] md:w-[40vw] h-[50vw] md:h-[40vw] rounded-full bg-rose-950/20 md:blur-[120px] blur-[60px] md:mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[60vw] md:w-[50vw] h-[60vw] md:h-[50vw] rounded-full bg-[#1a0005] md:blur-[150px] blur-[80px] md:mix-blend-screen" />
      </div>

      {/* 3. STARS */}
      <Stars mousePos={mousePos} isMobile={isMobile} />

      {/* 4. FLOATING FULL ROSES (Edges) */}
      <EdgeRoses isMobile={isMobile} />

      {/* 5. CINEMATIC FALLING ROSE PETALS */}
      <RosePetals isMobile={isMobile} />

      {/* 6. MAIN CONTENT LAYOUT */}
      <div className="relative z-30 flex flex-col items-center justify-center w-full max-w-4xl px-6 py-20 text-center">
        
        {/* Small Text */}
        <p className="animate-stagger-1 text-xs md:text-sm text-white/60 font-light tracking-[0.25em] uppercase mb-8">
          A Little Surprise Awaits
        </p>

        {/* Main Heading */}
        <h1 className="animate-stagger-2 text-3xl md:text-5xl lg:text-6xl font-light text-white/95 mb-6 tracking-wide drop-shadow-lg" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
          For Someone Truly Special...
        </h1>
        
        {/* Subtitle */}
        <p className="animate-stagger-3 text-sm md:text-base text-white/50 font-light tracking-wider mb-12">
          The moment is getting closer.
        </p>

        {/* Premium Portrait Image (EVEN BIGGER SIZE) */}
        <div className="animate-stagger-4 mb-16 relative w-64 h-80 md:w-96 md:h-[32rem] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(153,27,27,0.3)] md:shadow-[0_0_50px_rgba(153,27,27,0.4)]">
          <Image 
            src="/m5.jpeg" 
            alt="Someone Truly Special" 
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Countdown */}
        <div className="animate-stagger-5 flex items-center justify-center gap-4 md:gap-8 mb-24" dir="ltr">
          <TimeUnit value={days} label="DAYS" isMobile={isMobile} />
          <Divider />
          <TimeUnit value={hours} label="HOURS" isMobile={isMobile} />
          <Divider />
          <TimeUnit value={minutes} label="MINUTES" isMobile={isMobile} />
          <Divider />
          <TimeUnit value={seconds} label="SECONDS" isMobile={isMobile} />
        </div>

        {/* Bottom Text */}
        <div className="animate-stagger-6 h-10">
          <p className="text-base md:text-lg font-light text-white/60 tracking-wide drop-shadow-md">
            Every second brings us closer to something beautiful.
          </p>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Animated Countdown Unit (Days, Hours, Mins, Secs)
 */
function TimeUnit({ value, label, isMobile }: { value: number; label: string; isMobile: boolean }) {
  const formattedValue = value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center w-16 md:w-24">
      <div className="relative h-12 md:h-20 w-full flex items-center justify-center overflow-hidden mb-4">
        {/* On mobile, we remove the "key" so React updates the text natively without remounting the DOM node. This eliminates the stutter. */}
        {isMobile ? (
          <span
            className="absolute text-5xl md:text-7xl font-extralight text-white/90 tracking-tight"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            {formattedValue}
          </span>
        ) : (
          <span
            key={formattedValue} 
            className="absolute text-5xl md:text-7xl font-extralight text-white/90 tracking-tight number-slide"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
          >
            {formattedValue}
          </span>
        )}
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/40 font-light">
        {label}
      </span>
    </div>
  );
}

/**
 * Glassmorphism Divider
 */
function Divider() {
  return (
    <div className="h-12 md:h-16 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent transform -translate-y-4" />
  );
}

/**
 * Luxurious Framer Motion Rose Petals
 */
function RosePetals({ isMobile }: { isMobile: boolean }) {
  const petals = useMemo(() => {
    const colors = ["#4A0404", "#5C0505", "#3A0101", "#2E0000", "#1D0000"];
    const count = isMobile ? 10 : 28; // Reduced count on mobile
    
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      xStart: `${Math.random() * 100}vw`,
      xEnd: `${(Math.random() - 0.5) * 60 + 50}vw`,
      size: 12 + Math.random() * 22,
      delay: -(Math.random() * 30), 
      duration: 15 + Math.random() * 20, 
      rotStart: Math.random() * 360,
      rotEnd: Math.random() * 360 + (Math.random() > 0.5 ? 360 : -360),
      opacity: 0.2 + Math.random() * 0.4, 
      blur: isMobile ? 'none' : (Math.random() > 0.5 ? `blur(${1 + Math.random() * 4}px)` : 'blur(0.5px)'), // Disabled blur on mobile for GPU optimization
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
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
          <svg viewBox="0 0 25 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${isMobile ? '' : 'drop-shadow-xl'}`}>
            <path d="M2.203 14.618C1.527 10.222 3.86 4.75 9.074 2.115C14.288 -0.52 20.334 -0.06 22.84 3.73C25.346 7.52 24.3 14.264 21.01 19.34C17.72 24.416 11.23 28.182 6.845 25.8C2.46 23.418 2.88 19.014 2.203 14.618Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Floating Full Roses along the edges
 */
function EdgeRoses({ isMobile }: { isMobile: boolean }) {
  const edgeRoses = useMemo(() => {
    return [
      { id: 1, top: "10%", left: "-3%", size: 120, delay: 0, duration: 25, yFlow: 40, rotStart: 15, rotEnd: -5 },
      { id: 2, top: "45%", right: "-4%", size: 160, delay: -5, duration: 30, yFlow: -50, rotStart: -20, rotEnd: 10 },
      { id: 3, bottom: "15%", left: "2%", size: 100, delay: -10, duration: 28, yFlow: 30, rotStart: 45, rotEnd: 25 },
      { id: 4, bottom: "25%", right: "-2%", size: 130, delay: -15, duration: 35, yFlow: -40, rotStart: -10, rotEnd: -30 },
      { id: 5, top: "5%", right: "15%", size: 90, delay: -8, duration: 32, yFlow: 20, rotStart: 90, rotEnd: 70 },
    ];
  }, []);

  if (isMobile) return null; // Hide edge roses on mobile to save GPU power

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {edgeRoses.map((r) => (
        <motion.img
          key={r.id}
          src="/rose.png"
          alt=""
          initial={{ y: 0, rotate: r.rotStart }}
          animate={{ y: [0, r.yFlow, 0], rotate: [r.rotStart, r.rotEnd, r.rotStart] }}
          transition={{ duration: r.duration, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
          style={{
            position: "absolute",
            top: r.top,
            bottom: r.bottom,
            left: r.left,
            right: r.right,
            width: r.size,
            height: "auto",
            opacity: 0.08, 
            filter: "blur(3px) contrast(1.2)", 
          }}
        />
      ))}
    </div>
  );
}

/**
 * Tiny Twinkling Stars Background Parallax
 */
function Stars({ mousePos, isMobile }: { mousePos: { x: number; y: number }; isMobile: boolean }) {
  const stars = useMemo(() => {
    const count = isMobile ? 25 : 60; // Less stars on mobile
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 2}px`,
      duration: `${3 + Math.random() * 5}s`,
      delay: `-${Math.random() * 5}s`,
      minOpacity: Math.random() * 0.1,
      maxOpacity: 0.3 + Math.random() * 0.3,
    }));
  }, [isMobile]);

  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none transition-transform duration-[1500ms] ease-out"
      style={{ transform: `translate(${mousePos.x * (isMobile ? 0 : -30)}px, ${mousePos.y * (isMobile ? 0 : -30)}px)` }}
    >
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-[#fff4e6]"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animation: `twinkleStar ${s.duration} ease-in-out infinite`,
            animationDelay: s.delay,
            ["--min-opacity" as string]: s.minOpacity,
            ["--max-opacity" as string]: s.maxOpacity,
          }}
        />
      ))}
    </div>
  );
}