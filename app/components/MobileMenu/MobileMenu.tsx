import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Navigation from "../Navigation";
import clsx from "clsx";

interface MenuProps {
  onClose: () => void;
  className?: string;
  isVisible?: boolean;
  navigation?: {
    title?: string;
  }[];
}

const MobileMenu: React.FC<MenuProps> = ({
  isVisible,
  navigation,
  onClose,
  className,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className={clsx("z-50 md:hidden pt-10", className)}>
          <button
            className="text-brand-dark z-10 border-none absolute top-6 right-7"
            type="button"
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="hover:text-brand-default text-xl text-white transition-colors"
              onClick={onClose}
            />
          </button>
          <Navigation
            navigation={navigation}
            onClose={onClose}
            bgColor
            classNames={{
              root: "flex rounded-b-3xl text-center transition-all hover:!bg-brand-dark/80 mx-auto bg-brand-dark/50 flex-col gap-5 mt-2 mr-2 p-6 max-w-[38rem]",
              link: "no-underline !text-brand-light transition-colors hover:!text-brand-default",
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
