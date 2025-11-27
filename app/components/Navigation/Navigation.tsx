import React, { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { LineSvg } from "../Icons";

interface NavigationProps {
  navigation?: {
    title?: string;
  }[];
  classNames?: {
    root?: string;
    link?: string;
  };
  bgColor?: boolean;
  onClose?: () => void;
  isHeader?: boolean;
  activeSection?: string | null;
}

const Navigation = ({
  navigation,
  classNames,
  onClose,
  isHeader = false,
  activeSection,
  bgColor,
}: NavigationProps) => {
  if (!navigation?.length) return null;
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  function generateId(title?: string) {
    if (title)
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
  }

  return (
    <motion.ul
      className={classNames?.root}
      style={
        bgColor
          ? { background: "linear-gradient(to right, #A1C4FD, #C2E9FB)" }
          : {}
      }
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
      {navigation?.map((link, index) => {
        const linkRef = React.useRef<HTMLAnchorElement | null>(null);
        const [linkWidth, setLinkWidth] = React.useState<number | null>(null);
        const isActive = activeSection === generateId(link?.title || "");
        React.useEffect(() => {
          if (linkRef.current) {
            setLinkWidth(linkRef.current.offsetWidth);
          }
        }, []);

        return (
          <motion.li
            key={link.title}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            className={clsx("relative flex flex-col items-center")}
          >
            <a
              ref={linkRef}
              className={clsx(
                "no-underline",
                !isHeader && "hover:text-brand-default transition-all",
                classNames?.link
              )}
              href={`#${generateId(link?.title)}`}
              onClick={onClose}
            >
              {link.title}
            </a>
            {linkWidth && isHeader && (
              <LineSvg
                className="absolute top-full"
                width={linkWidth}
                isHovered={hoveredIndex === index || isActive}
              />
            )}
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default Navigation;
