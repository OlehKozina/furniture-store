"use client";
import React from "react";
import FooterContainer from "./FooterContainer";
import { NavigationType } from "@/types";

function Footer({ footer }: { footer?: NavigationType }) {
  if (!footer) return null;
  const { footerImages, ...footerContainer } = footer;
  return (
    <footer className="relative text-center py-2 bg-cover bg-opacity-20 bg-center bg-no-repeat md:text-left transition-all">
      <FooterContainer footerContainer={footerContainer} />
    </footer>
  );
}

export default Footer;
