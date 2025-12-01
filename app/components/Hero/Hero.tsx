"use client";
import React from "react";
import { HeroType } from "@/types/Hero";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { getHeadingParts, containerVariants, charVariants } from "./utils";

const Hero = ({ hero }: { hero: HeroType }) => {
  if (!hero) return null;
  const { heading, image, label, cards } = hero;
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/0" />
      <div className="container flex flex-col gap-5">
        {label && <h3 className="text-center text-xl">{label}</h3>}
        {heading && (
          <motion.h1
            initial="initial"
            animate="animate"
            variants={containerVariants}
            className="relative font-extrabold text-center text-7xl mb-24 leading-tight text-white md:top-0 md:mb-12 lg:line-height-[1.5] lg:mb-0"
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
      </div>
      <div className="flex relative gap-4 flex-wrap container mx-auto justify-center">
        {!!cards?.length &&
          cards.map((card) => (
            <div
              key={card.name}
              className="max-w-[21rem] w-full bg-brand-tangerine rounded-lg p-4 flex flex-col justify-between"
            >
              {card.name}
              {card.image && (
                <Image
                  width={150}
                  className="mx-auto"
                  height={200}
                  src={card.image}
                  alt="furniture-item"
                />
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default Hero;
