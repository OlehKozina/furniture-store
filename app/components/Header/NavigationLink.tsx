"use client";
import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface NavigationLinkProps {
  link: {
    title?: string;
    slug?: string;
    sublinks?: { name?: string }[];
  };
  index: number;
  isActive: boolean;
  hasSublinks: boolean;
  hoveredIndex: number | null;
  activeCategory: string | null;
  setHoveredIndex: (index: number | null) => void;
  setActiveCategory: (category: string | null) => void;
  generateId: (title?: string) => string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  link,
  index,
  isActive,
  hasSublinks,
  hoveredIndex,
  activeCategory,
  setHoveredIndex,
  setActiveCategory,
  generateId,
}) => {
  return (
    <motion.li
      key={link.title}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
      }}
      className={clsx(
        "relative flex flex-col items-center flex-1 hover:shadow-lg group",
        isActive && "shadow-lg bg-brand-default bg-opacity-80"
      )}
    >
      <a
        className={clsx("no-underline p-4 md:p-[1.75rem] transition-all")}
        href={`#${generateId(link?.slug)}`}
      >
        {link.title}
      </a>

      {hasSublinks && hoveredIndex === index && (
        <div className="absolute top-full left-0 w-full bg-white z-50 flex flex-col shadow-lg">
          {link.sublinks?.map((sublink) => (
            <a
              key={sublink.name}
              href={`#${generateId(sublink.name)}`}
              onClick={() => setActiveCategory(sublink.name ?? null)}
              className={clsx(
                "px-6 py-3 hover:bg-green/20 whitespace-nowrap text-sm text-brand-charcoal",
                activeCategory === sublink.name && "bg-green/20"
              )}
            >
              {sublink.name}
            </a>
          ))}
        </div>
      )}
    </motion.li>
  );
};

export default NavigationLink;
