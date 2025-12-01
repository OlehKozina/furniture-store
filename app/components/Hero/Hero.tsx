"use client";
import React from "react";
import { HeroType } from "@/types/Hero";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { getHeadingParts, containerVariants, charVariants } from "./utils";

const Hero = ({ hero }: { hero: HeroType }) => {
  if (!hero) return null;
  const { heading, image, label } = hero;
  const { firstWord, fullText } = getHeadingParts(heading);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section
      className="relative flex flex-col items-center overflow-hidden min-h-screen"
      id="hero"
    >
      <motion.div
        style={{
          y: yBg,
        }}
        className="absolute inset-0 bg-cover bg-top"
      >
        {image && (
          <Image
            src={image}
            alt="hero-image"
            fill
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-black opacity-60" />
      <div className="container flex flex-col gap-5 relative items-center justify-center min-h-screen z-above-content">
        {label && <h3 className="text-center text-3xl text-white">{label}</h3>}
        {heading && (
          <motion.h1
            initial="initial"
            animate="animate"
            variants={containerVariants}
            className="relative font-extrabold text-center text-7xl mb-24 leading-tight text-white md:top-0 md:mb-12 lg:line-height-[1.5] lg:mb-0"
          >
            {fullText.map((char, index) => {
              return (
                <motion.span key={index} variants={charVariants}>
                  {char}
                </motion.span>
              );
            })}
          </motion.h1>
        )}
      </div>
    </section>
  );
};

export default Hero;
