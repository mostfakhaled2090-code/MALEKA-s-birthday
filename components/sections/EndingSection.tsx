"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function EndingSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 1.2,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.8,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-rose-950 via-[rgb(30,5,8)] to-black overflow-hidden flex flex-col items-center justify-center py-24 md:py-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[800px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-8 relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full flex flex-col items-center"
        >
          <motion.h2
            variants={textVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-rose-50 mb-12 text-center"
            dir="rtl"
          >
           اخر صفحة
          </motion.h2>

          <motion.div
            variants={textVariants}
            className="text-xl md:text-2xl lg:text-3xl text-rose-100/90 leading-relaxed md:leading-[2.2] text-center font-serif space-y-4"
            dir="rtl"
          >

          </motion.div>

          <motion.p
            variants={textVariants}
            className="text-lg md:text-xl text-amber-300 font-serif mt-12 mb-20 text-center tracking-wide"
            dir="rtl"
          >
        
        بحب الصورة دي 
        

          </motion.p>

          <motion.div
            variants={imageVariants}
            className="relative w-full max-w-[90vw] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[600px] mt-8"
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [-8, 8, -8],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-rose-200/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] p-2 transition-colors duration-500 hover:border-rose-200/20 hover:bg-white/[0.05]"
            >
              <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-gradient-to-br from-rose-900/40 to-black/60 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />

                <Image
                  src="/m18.jpeg"
                  alt="Malak" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}