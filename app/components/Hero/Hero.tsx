"use client";
import React, { useState } from "react";
import { HeroType } from "@/types/Hero";
import { ModalForm } from "../Form";
import { motion, useScroll, useTransform } from "framer-motion";
import { getHeadingParts, containerVariants, charVariants } from "./utils";

const Hero = ({ hero }: { hero: HeroType }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleForm = () => setIsFormVisible((prev) => !prev);
  if (!hero) return null;
  const { heading, videoUrl, privacyPolicy, form } = hero;
  const { firstWord, fullText } = getHeadingParts(heading);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  return (
    <section
      className="relative flex items-center overflow-hidden h-screen"
      id="hero"
    >
      <motion.div
        style={{
          y: yBg,
        }}
        className="absolute inset-0 bg-cover bg-top"
      >
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/0" />
      <div className="container flex flex-col gap-5">
        {heading && (
          <motion.h1
            initial="initial"
            animate="animate"
            variants={containerVariants}
            className="relative font-extrabold text-center text-7xl mb-24 leading-tight text-brand-light md:top-0 md:mb-12 xs:text-8xl lg:text-9xl lg:line-height-[1.5] lg:mb-0"
          >
            {fullText.map((char, index) => {
              const isFirstWordChar = index < firstWord.length;
              return (
                <motion.span
                  key={index}
                  variants={charVariants}
                  className={isFirstWordChar ? "text-brand-default" : ""}
                >
                  {char}
                </motion.span>
              );
            })}
          </motion.h1>
        )}
        <button
          className="lg:hidden mx-auto block px-4 py-2 bg-brand-default transition-all text-brand-light border border-brand-default rounded-lg cursor-pointer hover:bg-opacity-60 font-semibold md:px-8 md:py-4 z-1 relative"
          type="button"
          onClick={toggleForm}
        >
          Request a call
        </button>
        <ModalForm
          onClose={toggleForm}
          isVisible={isFormVisible}
          form={form}
          privacyPolicy={privacyPolicy}
        />
      </div>
    </section>
  );
};

export default Hero;
