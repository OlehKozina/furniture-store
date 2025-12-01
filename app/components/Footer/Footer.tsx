"use client";
import React from "react";
import FooterContainer from "./FooterContainer";
import { NavigationType } from "@/types";

function Footer({ footer }: { footer?: NavigationType }) {
  if (!footer) return null;
  return (
    <footer className="relative text-center py-20 bg-cover bg-opacity-20 bg-center bg-no-repeat md:text-left transition-all">
      <FooterContainer footerContainer={footer} />
    </footer>
  );
}

export default Footer;
