"use client";
import FooterImages from "./FooterImages";
import React from "react";
import FooterContainer from "./FooterContainer";
import { NavigationType } from "@/types";

function Footer({ footer }: { footer?: NavigationType }) {
  if (!footer) return null;
  const { footerImages, ...footerContainer } = footer;
  return (
    <footer
      className="relative text-center py-2 bg-cover bg-opacity-20 bg-center bg-no-repeat md:text-left transition-all"
      style={{
        background: "linear-gradient(to right, #A1C4FD, #C2E9FB)",
      }}
    >
      <FooterContainer footerContainer={footerContainer} />
      <FooterImages footerImages={footerImages} />
    </footer>
  );
}

export default Footer;
