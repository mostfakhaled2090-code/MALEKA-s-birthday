"use client";

import {
  motion,
  useReducedMotion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
}

interface MediaItem {
  id: number;
  type: "image" | "video";
  src: string;
  aspect: string;
}

const mediaItems: MediaItem[] = [
  { id: 1, type: "image", src: "/m1.jpeg", aspect: "aspect-[3/4]" },
  { id: 2, type: "image", src: "/m2.jpeg", aspect: "aspect-square" },
  { id: 3, type: "image", src: "/m3.jpeg", aspect: "aspect-[4/5]" },
  { id: 4, type: "image", src: "/m5.jpeg", aspect: "aspect-[16/9]" },
  { id: 5, type: "video", src: "/m12.mp4", aspect: "aspect-[9/16]" },
  { id: 6, type: "image", src: "/m6.jpeg", aspect: "aspect-square" },
  { id: 7, type: "image", src: "/m7.jpeg", aspect: "aspect-[3/4]" },
  { id: 8, type: "image", src: "/m8.jpeg", aspect: "aspect-[4/5]" },
  { id: 9, type: "image", src: "/m9.jpeg", aspect: "aspect-[3/2]" },
  { id: 10, type: "image", src: "/m10.jpeg", aspect: "aspect-square" },
  { id: 11, type: "image", src: "/m11.jpeg", aspect: "aspect-[4/5]" },
  { id: 12, type: "image", src: "/m17.jpeg", aspect: "aspect-[3/4]" },
  { id: 13, type: "image", src: "/m14.jpeg", aspect: "aspect-[16/9]" },
  { id: 14, type: "image", src: "/m15.jpeg", aspect: "aspect-[4/5]" },
  { id: 15, type: "image", src: "/m16.jpeg", aspect: "aspect-square" },
];

export function MemoriesSection() {
  const shouldReduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const generatedParticles: Particle[] = Array.from({ length: 35 }).map(
      (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 5,
        duration: Math.random() * 15 + 15,
      })
    );

    setParticles(generatedParticles);
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % mediaItems.length : null
    );
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + mediaItems.length) % mediaItems.length
        : null
    );
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        handleNext();
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        handlePrev();
      }

      if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    },
    [selectedIndex, handleNext, handlePrev]
  );

  useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex, handleKeyDown]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) {
      handleNext();
    }

    if (distance < -50) {
      handlePrev();
    }

    setTouchStart(null);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <section className="relative w-full py-32 min-h-screen bg-gradient-to-b from-rose-950 via-[rgb(40,8,12)] to-rose-950 overflow-hidden">
      {/* Cinematic Ambient Glows */}

      <div className="absolute top-1/4 left-1/4 w-full max-w-2xl h-[500px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="absolute bottom-1/4 right-1/4 w-full max-w-2xl h-[500px] bg-amber-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Floating Golden Particles */}

      {mounted && !shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-amber-300/20 shadow-[0_0_12px_2px_rgba(251,191,36,0.15)]"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, Math.random() * 30 - 15, 0],
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

      <div className="container px-4 md:px-8 relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-rose-50 mb-6">
            MEMORIES
          </h2>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-20 md:w-32" />

            <div className="w-2 h-2 rotate-45 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />

            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-20 md:w-32" />
          </div>
        </motion.div>

        {/* Masonry Gallery Grid */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6"
        >
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              onClick={() => setSelectedIndex(index)}
              className="relative break-inside-avoid group cursor-pointer"
            >
              <div
                className={`relative overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-rose-200/10 shadow-xl w-full ${item.aspect} transition-shadow duration-500 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] group-hover:border-rose-200/20`}
              >
                {/* Soft glow hover overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                {/* Media Content */}

                <motion.div
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-900/30 to-[rgb(30,5,8)]/50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {item.type === "video" ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item.src}
                      alt={`Memory ${item.id}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>

                {/* Video Indicator */}

                {item.type === "video" && (
                  <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <svg
                      className="w-4 h-4 text-white/80 ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-3xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}

            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-50 p-3 text-white/50 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Previous */}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 md:left-10 z-50 p-4 text-white/50 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10 hidden md:block"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next */}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-10 z-50 p-4 text-white/50 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10 hidden md:block"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7-7"
                />
              </svg>
            </button>

            {/* Current Media */}

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-5xl max-h-[85vh] px-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`w-full max-w-4xl max-h-[85vh] bg-gradient-to-br from-rose-900/20 to-amber-900/10 border border-white/10 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden`}
              >
                {mediaItems[selectedIndex].type === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-2xl"
                  >
                    <source
                      src={mediaItems[selectedIndex].src}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <img
                    src={mediaItems[selectedIndex].src}
                    alt={`Memory ${mediaItems[selectedIndex].id}`}
                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-2xl"
                  />
                )}
              </div>
            </motion.div>

            {/* Mobile swipe hint */}

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-sm md:hidden font-serif">
              Swipe to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}