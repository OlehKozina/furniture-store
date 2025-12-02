import React from "react";
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
      <h4 className="opacity-50 text-xs mb-2">{title}</h4>
      {links?.map((link) => {
        const linkRef = React.useRef<HTMLAnchorElement | null>(null);

        return (
          <motion.li
            key={link.title}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            className={clsx(
              "relative flex flex-col hover:text-brand-default transition-colors"
            )}
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
