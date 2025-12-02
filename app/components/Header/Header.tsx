"use client";
import HeaderNav from "./HeaderNav";
import React from "react";
import { NavigationType } from "@/types";
import clsx from "clsx";
import { useHeaderScroll, useActiveSectionObserver } from "./utils";

const Header = ({ header }: { header: NavigationType }) => {
  const hidden = useHeaderScroll(80);
  const activeSection = useActiveSectionObserver(0.6);

  if (!header) return null;
  const { navigation } = header;

  return (
    <header
      className={clsx(
        "px-2 shadow-lg top-0 left-0 w-full z-10 sticky transition-all bg-white",
        hidden && "-translate-y-full"
      )}
    >
      <div className={clsx("container transition-all")}>
        <HeaderNav navigation={navigation} activeSection={activeSection} />
      </div>
    </header>
  );
};

export default Header;
