import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import React from "react";
import NavigationLink from "../Header/NavigationLink";
import clsx from "clsx";
import { motion } from "framer-motion";

interface MenuProps {
  onClose: () => void;
  className?: string;
  isVisible?: boolean;
  setActiveCategory: (category: string | null) => void;
  generateId: (title?: string) => string;
  hoveredIndex: number | null;
  activeCategory: string | null;
  activeSection?: string | null;
  setHoveredIndex: (index: number | null) => void;
  navigation?: {
    title?: string;
    slug?: string;
    sublinks?: {
      name?: string;
    }[];
  }[];
}

const MobileMenu: React.FC<MenuProps> = ({
  isVisible,
  navigation,
  onClose,
  className,
  hoveredIndex,
  activeCategory,
  setHoveredIndex,
  setActiveCategory,
  generateId,
  activeSection,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className={clsx("z-50 md:hidden pt-10 bg-white", className)}>
          <button
            className="text-brand-teal z-10 border-none absolute top-6 right-4"
            type="button"
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="hover:text-brand-default text-xl text-black transition-colors"
              onClick={onClose}
            />
          </button>
          <motion.ul
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
            className="flex flex-col text-brand-charcoal list-none flex-grow justify-center text-lg lg:text-xl font-extrabold"
          >
            {navigation?.map((link, index) => {
              const isActive = activeSection === generateId(link?.title || "");
              const hasSublinks = !!(link.sublinks && link.sublinks.length > 0);

              return (
                <NavigationLink
                  key={link.title}
                  {...{
                    link,
                    index,
                    isActive,
                    hasSublinks,
                    hoveredIndex,
                    activeCategory,
                    setHoveredIndex,
                    setActiveCategory,
                    generateId,
                  }}
                />
              );
            })}
          </motion.ul>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
