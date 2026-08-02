"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  
  // Start as false to prevent hydration mismatch and handle touch detection
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check for fine pointer (mouse) and reduced motion preferences
    const isHoverable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isHoverable || prefersReducedMotion) {
      return;
    }

    setShouldRender(true);
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Show cursor and snap to first position on initial move
      if (!isVisible && cursorRef.current) {
        cursorRef.current.style.opacity = "1";
        isVisible = true;
        current.current = { x: e.clientX, y: e.clientY };
      }
    };

    const updateCursor = () => {
      if (cursorRef.current && isVisible) {
        // Linear interpolation (lerp) for the smooth, luxurious lagging effect
        current.current.x += (mouse.current.x - current.current.x) * 0.1;
        current.current.y += (mouse.current.y - current.current.y) * 0.1;

        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none opacity-0 transition-opacity duration-1000 z-0"
      style={{
        background: "radial-gradient(circle, rgba(255,220,180,0.18) 0%, transparent 70%)",
        margin: "-160px 0 0 -160px", // Offset by half width/height to center on cursor
        mixBlendMode: "screen",
        willChange: "transform, opacity",
      }}
    />
  );
}