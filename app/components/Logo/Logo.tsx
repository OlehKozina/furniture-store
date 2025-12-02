import React from "react";
import Image from "next/image";
import clsx from "clsx";

const Logo = ({
  className,
  width = 50,
  height = 50,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <a href="#" className={clsx("relative p-4", className)}>
      <Image
        src="/logo.png"
        alt="furniture_logo"
        width={width}
        height={height}
      />
    </a>
  );
};

export default Logo;
