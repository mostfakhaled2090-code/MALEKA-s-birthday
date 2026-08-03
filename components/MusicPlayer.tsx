"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function MusicPlayer() {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        preload="auto"
        className="hidden"
      />
      
      <motion.button
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1,
          delay: 1,
          ease: "easeOut",
        }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        onClick={togglePlay}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex items-center gap-3 px-4 py-3 md:px-5 md:py-3.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-rose-200/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] group hover:bg-white/[0.06] hover:border-amber-500/30 transition-all duration-500"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {/* Soft Inner Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Icon */}
        <span className="relative z-10 flex items-center justify-center w-6 h-6 text-amber-400 drop-shadow-md">
          {isPlaying ? (
            <svg 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              className="w-full h-full"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          ) : (
            <svg 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              className="w-full h-full"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          )}
        </span>

        {/* Text */}
        <span className="relative z-10 font-serif text-sm md:text-base text-rose-50/90 group-hover:text-amber-200 transition-colors duration-300 pr-1">
          {isPlaying ? "Pause" : "Play"}
        </span>

        {/* Gentle Pulsing Ring when playing */}
        {isPlaying && !shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-full border border-amber-400/20 pointer-events-none"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.5, 0, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeOut" 
            }}
          />
        )}
      </motion.button>
    </>
  );
}