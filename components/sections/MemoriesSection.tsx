"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function MemoriesSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      await video.play();
    } catch (error) {
      console.error("Could not play video:", error);
    }
  };

  const handleVideoClick = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      handlePlay();
    } else {
      video.pause();
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section
      id="memories"
      className="relative min-h-screen w-full overflow-hidden bg-[#3a000d] px-5 py-24 md:px-10 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[25%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#8f1738]/10 blur-[140px]" />

        <div className="absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-[#b8860b]/5 blur-[120px]" />

        <div className="absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-[#b8860b]/5 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="font-serif text-5xl tracking-wide text-[#fff8f0] md:text-7xl">
            MEMORIES
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#c9a227]/70 md:w-28" />

            <div className="h-2 w-2 rotate-45 bg-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.7)]" />

            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#c9a227]/70 md:w-28" />
          </div>

          <p className="mt-6 text-sm font-light tracking-[0.18em] text-white/50 md:text-base">
            A little piece of every moment we shared.
          </p>
        </motion.div>

        {/* VIDEO */}
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group relative w-full max-w-5xl"
        >
          {/* Gold outer glow */}
          <div className="pointer-events-none absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-[#8d6b18]/20 via-[#d4af37]/50 to-[#8d6b18]/20 opacity-80 blur-[1px]" />

          {/* Video container */}
          <div className="relative overflow-hidden rounded-[26px] border border-[#d4af37]/30 bg-black shadow-[0_25px_100px_rgba(0,0,0,0.55)]">
            <video
              ref={videoRef}
              className="block aspect-video w-full cursor-pointer object-contain"              poster="/m22.png"
              controls
              preload="metadata"
              playsInline
              onClick={handleVideoClick}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleVideoEnded}
            >
              <source src="/memories.mp4" type="video/mp4" />
              Your browser does not support the video element.
            </video>

            {/* PLAY OVERLAY */}
            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Play memories"
                className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/10 transition-all duration-500 hover:bg-black/20"
              >
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/70 bg-black/35 shadow-[0_0_40px_rgba(212,175,55,0.18)] backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-[#e5c354] group-hover:bg-black/45 md:h-24 md:w-24">
                  <span className="absolute inset-1 rounded-full border border-white/10" />

                  <span
                    className="ml-1 block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-[#f5d76e] md:border-y-[11px] md:border-l-[17px]"
                    style={{
                      filter:
                        "drop-shadow(0 0 8px rgba(212,175,55,0.6))",
                    }}
                  />
                </span>
              </button>
            )}

            {/* Cinematic gradient */}
            <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-black/25 via-transparent to-black/10" />
          </div>
        </motion.div>

        {/* CAPTION */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: 0.35,
          }}
          className="mt-8 max-w-2xl text-center md:mt-10"
        >
          <p className="font-serif text-lg italic leading-relaxed text-white/65 md:text-xl">
            Every little moment became a memory worth keeping.
          </p>
        </motion.div>
      </div>
    </section>
  );
}