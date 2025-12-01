import React, { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

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
  if (!links?.length) return null;
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  return (
    <motion.ul
      className={classNames?.root}
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
      <h4>{title}</h4>
      {links?.map((link, index) => {
        const linkRef = React.useRef<HTMLAnchorElement | null>(null);
        const [linkWidth, setLinkWidth] = React.useState<number | null>(null);
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
              className={clsx("no-underline", classNames?.link)}
              href={`#${link?.slug}`}
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
