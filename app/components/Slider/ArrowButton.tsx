import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

const ArrowButton = ({
  direction,
  onClick,
}: {
  direction?: "left" | "right";
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "shadow-xl absolute bg-none top-1/2 transform -translate-y-1/2 p-2 z-5 transition-all",
        direction === "left"
          ? "left-0 hover:-translate-x-2"
          : "right-0 hover:translate-x-4"
      )}
    >
      <FontAwesomeIcon
        icon={direction === "left" ? faChevronLeft : faChevronRight}
        className="text-base text-white h-32 w-32"
      />
    </button>
  );
};

export default ArrowButton;
