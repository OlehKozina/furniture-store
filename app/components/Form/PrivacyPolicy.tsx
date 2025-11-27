import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "next-sanity";
import React from "react";
import clsx from "clsx";

interface PrivacyPolicyProps {
  onClose: () => void;
  isVisible?: boolean;
  privacyPolicy?: PortableTextBlock;
  className?: string;
}
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-4 mx-auto">{children}</h1>
    ),
    normal: ({ children }) => <p className="mb-4 !text-left">{children}</p>,
  },
};

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  isVisible,
  onClose,
  privacyPolicy,
  className,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={clsx(
            "fixed inset-0 z-overlay p-5 py-20 flex items-center justify-center bg-brand-dark bg-opacity-50",
            className
          )}
        >
          <div className="relative z-10 items-left w-full bg-brand-dark rounded-[2rem] transition-opacity duration-slow max-w-[28rem] md:max-w-[38rem] px-8">
            <div className="text-black no-scroll-bar h-full max-h-[60vh] md:max-h-[70vh] py-16">
              <PortableText
                value={privacyPolicy || []}
                components={components}
              />
            </div>
            <button
              className="z-10 border-none absolute top-7 md:top-3 right-5"
              type="button"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="hover:text-brand-default text-black text-xl transition-colors"
                onClick={onClose}
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPolicy;
