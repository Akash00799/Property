"use client";

import React, { useEffect, useRef, useState } from "react";

interface SmoothRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Milliseconds
  threshold?: number;
}

export default function SmoothReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.08,
}: SmoothRevealProps) {
  const domRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // If reduced motion is requested, show immediately
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }

    const currentEl = domRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => setRevealed(true), delay);
            } else {
              setRevealed(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold]);

  return (
    <div
      ref={domRef}
      className={`smooth-reveal ${revealed ? "is-revealed" : ""} ${className}`}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
