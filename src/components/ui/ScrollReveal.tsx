"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const revealSelector = "[data-reveal]";

export function ScrollReveal() {
  const pathname = usePathname();

  return <ScrollRevealObserver key={pathname} />;
}

function ScrollRevealObserver() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    root.classList.add("reveal-enabled");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      for (const element of elements) {
        element.classList.add("is-revealed");
      }

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
