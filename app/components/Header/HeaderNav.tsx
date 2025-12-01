import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { ShoppingCart } from "lucide-react";

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
        {navigation?.map((link, index) => {
          console.log("sub", link.sublinks);
          const linkRef = React.useRef<HTMLAnchorElement | null>(null);
          const isActive = activeSection === generateId(link?.title || "");
          const hasSublinks = link.sublinks && link.sublinks.length > 0;
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
                ref={linkRef}
                className={clsx("no-underline p-[1.75rem] transition-all")}
                href={`#${generateId(link?.slug)}`}
              >
                {link.title}
              </a>
              {hasSublinks && (
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-full bg-white z-50 flex flex-col"
                    >
                      {link.sublinks?.map((sublink) => (
                        <a
                          key={sublink.name}
                          href={`#${generateId(sublink.name)}`}
                          className="px-6 py-3 hover:bg-green/20 whitespace-nowrap text-sm text-brand-charcoal hover:shadow-lg"
                        >
                          {sublink.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
      <button
        className="p-4 rounded-2xl hover:bg-brand-green/10 transition-colors"
        aria-label="Cart"
      >
        <ShoppingCart className="w-7 h-7 text-green" />
      </button>
    </nav>
  );
};

export default HeaderNav;
