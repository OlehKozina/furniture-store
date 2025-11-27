import React from "react";
import Image from "next/image";
import Navigation from "../Navigation";

const HeaderNav = ({
  navigation,
  activeSection,
}: {
  navigation?: {
    title?: string;
  }[];
  activeSection?: string | null;
}) => {
  return (
    <nav className="flex items-center flex-grow gap-10">
      <a href="#" className="z-cover relative">
        <Image src="/logo.svg" alt="bakery_logo" width={100} height={24} />
      </a>
      <Navigation
        navigation={navigation}
        activeSection={activeSection}
        isHeader
        classNames={{
          root: "hidden md:flex text-brand-orange list-none gap-16 flex-grow justify-center text-lg lg:text-xl font-extrabold",
        }}
      />
    </nav>
  );
};

export default HeaderNav;
