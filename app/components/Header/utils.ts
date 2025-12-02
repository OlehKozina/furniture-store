import React, { useState, useEffect } from "react";

export const generateId = (title?: string): string => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const useHeaderScroll = (threshold: number = 80) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > threshold) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, [threshold]);

  return hidden;
};

export const useActiveSectionObserver = (threshold: number = 0.6) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            if (id === "hero") {
              setActiveSection(null);
            } else {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [threshold]);

  return activeSection;
};
