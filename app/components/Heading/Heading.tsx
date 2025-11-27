"use client";
import React from "react";
import { containerVariants, charVariants } from "../Hero/utils";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const Heading = ({
  heading,
  className,
}: {
  heading?: string;
  className?: string;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  if (!heading) return null;
  const words = heading.split(" ");
  const lastTwoWords = words.slice(-2).join(" ");
  const fullText = heading.split("");
  const lastTwoChars = lastTwoWords.length;
  const lastTwoStartIndex = fullText.length - lastTwoChars;
  const lastTwoWordIndices = words.length - 2;
  return (
    <motion.h2
      ref={ref}
      variants={containerVariants}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      className={clsx(
        "font-extrabold leading-tight text-3xl sm:text-4xl",
        className
      )}
    >
      {words.map((word, wordIndex) => {
        const numberMatch = word.match(/\d+/);

        if (numberMatch) {
          const number = parseInt(numberMatch[0], 10);

          return (
            <motion.span
              key={wordIndex}
              variants={charVariants}
              className="text-brand-default inline-block mx-1"
            >
              <CountUp
                start={1}
                end={number}
                duration={2}
                enableScrollSpy
                scrollSpyOnce
              />
              {word.replace(numberMatch[0], "")}
            </motion.span>
          );
        }
        const isLastTwoWords = wordIndex >= lastTwoWordIndices;
        return (
          <span
            key={wordIndex}
            className={clsx(
              "inline-block mx-1",
              isLastTwoWords && "text-brand-default"
            )}
          >
            {word.split("").map((char, charIndex) => {
              const isLastTwoWordsChar = charIndex >= lastTwoStartIndex;
              return (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  variants={charVariants}
                  className={isLastTwoWordsChar ? "text-brand-default" : ""}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </motion.h2>
  );
};

export default Heading;
