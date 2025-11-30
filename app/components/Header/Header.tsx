"use client";
import HeaderNav from "./HeaderNav";
import React, { useState, useEffect } from "react";
import { NavigationType } from "@/types";
import clsx from "clsx";

const Header = ({ header }: { header: NavigationType }) => {
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) setHidden(true);
      else setHidden(false);
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            if (id === "hero") {
              setActiveSection(null);
            } else setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  if (!header) return null;
  const { navigation } = header;

  return (
    <header
      className={clsx(
        "px-2 top-0 left-0 w-full z-10 sticky transition-all bg-white",
        hidden && "-translate-y-full"
      )}
    >
      <div className={clsx("container transition-all rounded-3xl p-4")}>
        <div className="flex items-center gap-10 relative">
          <HeaderNav navigation={navigation} activeSection={activeSection} />
        </div>
      </div>
    </header>
  );
};

export default Header;
