"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface NavigationProps {
  links?: {
    title?: string;
    slug?: string;
  }[];
  title?: string;
  classNames?: {
    root?: string;
    link?: string;
  };
  onClose?: () => void;
}

const Navigation = ({ links, title, classNames, onClose }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 700);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!links?.length) return null;

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  if (isMobile) {
    return (
      <div className={clsx(classNames?.root, "sm:hidden")}>
        <button
          onClick={toggleAccordion}
          className="flex items-center justify-between w-full py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
          aria-expanded={isOpen}
        >
          <h4 className="font-medium text-brand-charcoal">{title}</h4>
          <ChevronDown
            className={clsx(
              "w-4 h-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {links.map((link, index) => (
                <motion.li
                  key={link.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={`#${link.slug}`}
                    onClick={onClose}
                    className="block py-3 px-4 hover:bg-gray-50 text-sm text-brand-charcoal transition-colors"
                  >
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.ul
      className={clsx(classNames?.root, "hidden sm:flex")}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      <h4 className="opacity-50 text-xs mb-2">{title}</h4>

      {links.map((link) => {
        return (
          <motion.li
            key={link.title}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            className="relative flex flex-col hover:text-brand-default transition-colors"
          >
            <a
              className={clsx("no-underline", classNames?.link)}
              href={`#${link.slug}`}
              onClick={onClose}
            >
              {link.title}
            </a>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default Navigation;
