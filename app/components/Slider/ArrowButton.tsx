import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
        "shadow-xl absolute bg-brand-brick hover:opacity-100 opacity-90 rounded-full h-8 w-8 top-0 transform -translate-y-1/2 p-2 z-5 transition-all text-black",
        direction === "left"
          ? "left-0 hover:-translate-x-2"
          : "left-10 hover:translate-x-4"
      )}
    >
      <FontAwesomeIcon
        icon={direction === "left" ? faArrowLeft : faArrowRight}
        className="text-base"
      />
    </button>
  );
};

export default ArrowButton;
