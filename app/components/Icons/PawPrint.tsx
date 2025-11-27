import React from "react";
import clsx from "clsx";

const PawPrint = ({ className }: { className?: string }) => {
  return (
    <>
      <img
        src="/dog-paw.png"
        alt="pawPrint"
        className={clsx("opacity-50 z-0 rotate-45", className)}
      />
    </>
  );
};

export default PawPrint;
