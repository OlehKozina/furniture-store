"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCategoryStore } from "@/stores/activeCategoryStore";
import Cart, { CartButton } from "../Cart";
import Logo from "../Logo";
import NavigationLink from "./NavigationLink";
import { generateId } from "./utils";

const HeaderNav = ({
  navigation,
  activeSection,
}: {
  navigation?: {
    title?: string;
    slug?: string;
    sublinks?: {
      name?: string;
    }[];
  }[];
  activeSection?: string | null;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const { activeCategory, setActiveCategory } = useCategoryStore();

  return (
    <nav className="flex items-center flex-grow gap-10 relative">
      <Logo />
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
        className="hidden md:flex text-brand-charcoal list-none flex-grow justify-center text-lg lg:text-xl font-extrabold px-20"
      >
        {navigation?.map((link, index) => {
          const isActive = activeSection === generateId(link?.title || "");
          const hasSublinks = !!(link.sublinks && link.sublinks.length > 0);

          return (
            <NavigationLink
              key={link.title}
              link={link}
              index={index}
              isActive={isActive}
              hasSublinks={hasSublinks}
              hoveredIndex={hoveredIndex}
              activeCategory={activeCategory}
              setHoveredIndex={setHoveredIndex}
              setActiveCategory={setActiveCategory}
              generateId={generateId}
            />
          );
        })}
      </motion.ul>
      <div className="relative">
        <CartButton />
      </div>
      <Cart />
    </nav>
  );
};

export default HeaderNav;
