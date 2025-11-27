import React from "react";
import Image from "next/image";
import FooterNavigation from "./FooterNavigation";
import { NavigationType } from "@/types";

const FooterContainer = ({
  footerContainer,
}: {
  footerContainer?: NavigationType;
}) => {
  return (
    <div className="container z-content relative flex text-center flex-grow flex-col md:flex-row">
      <a
        href="#"
        className="mt-4 flex justify-center md:inline-block md:justify-start md:mt-0 z-[5]"
      >
        <Image
          src="/logo.svg"
          alt="bakery_logo"
          width={100}
          height={24}
          className="relative z-5"
        />
      </a>
      <FooterNavigation footerNavigation={footerContainer} />
    </div>
  );
};

export default FooterContainer;
