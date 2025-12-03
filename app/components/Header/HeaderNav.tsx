"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCategoryStore } from "@/stores/activeCategoryStore";
import Cart, { CartButton } from "../Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../Logo";
import NavigationLink from "./NavigationLink";
import { generateId } from "./utils";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MobileMenu from "../MobileMenu/MobileMenu";

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
  const [isMobMenuVisible, setIsMobMenuVisible] = useState(false);
  const toggleMobMenu = () => setIsMobMenuVisible((prev) => !prev);
  const { activeCategory, setActiveCategory } = useCategoryStore();

  return (
    <nav className="flex items-center flex-grow relative">
      {!isMobMenuVisible && (
        <button
          className=" bg-transparent border-none text-brand-light sm:hidden menu-btn-open"
          type="button"
        >
          <FontAwesomeIcon
            icon={faBars}
            className="hover:text-brand-default text-xl xs:p-4"
            onClick={toggleMobMenu}
          />
        </button>
      )}
      <MobileMenu
        onClose={toggleMobMenu}
        activeSection={activeSection}
        isVisible={isMobMenuVisible}
        navigation={navigation}
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
        generateId={generateId}
        className="absolute -left-8 top-14"
      />
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
        className="hidden sm:flex text-brand-charcoal list-none flex-grow justify-center text-base md:text-lg lg:text-xl font-extrabold md:px-10 1000:px-20"
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
      <div className="relative max-md:ml-auto">
        <CartButton />
      </div>
      <Cart />
    </nav>
  );
};

export default HeaderNav;
