import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";

const HeaderNav = ({
  navigation,
  activeSection,
}: {
  navigation?: {
    title?: string;
    slug?: string;
  }[];
  activeSection?: string | null;
}) => {
  function generateId(title?: string) {
    if (title)
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
  }
  return (
    <nav className="flex items-center flex-grow gap-10">
      <a href="#" className="z-cover relative p-4">
        <Image src="/logo.png" alt="furniture_logo" width={50} height={50} />
      </a>
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
        {navigation?.map((link) => {
          const linkRef = React.useRef<HTMLAnchorElement | null>(null);
          const isActive = activeSection === generateId(link?.title || "");
          return (
            <motion.li
              key={link.title}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              className={clsx(
                "relative flex flex-col items-center flex-1 hover:shadow-lg",
                isActive && "shadow-lg bg-brand-default bg-opacity-80"
              )}
            >
              <a
                ref={linkRef}
                className={clsx("no-underline p-[1.75rem] transition-all")}
                href={`#${generateId(link?.slug)}`}
              >
                {link.title}
              </a>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
};

export default HeaderNav;
