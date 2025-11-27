"use client";
import React from "react";
import Image from "next/image";
import Heading from "../Heading";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export interface MediaGridWithTextProps {
  _id: string;
  heading?: string;
  videoTop?: string;
  videoBottom?: string;
  text?: string;
}

const MediaGridWithText = ({
  heading,
  videoTop,
  videoBottom,
  text,
}: MediaGridWithTextProps) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  return (
    <section className="px-2 sm:container relative py-10 mx-auto" id="services">
      <div className="relative p-7 sm:p-14 bg-opacity-80 rounded-3xl bg-brand-dark max-md:scroll-mt-16 scroll-mt-24">
        {heading && (
          <Heading
            className="text-3xl md:!text-6xl font-bold text-left max-w-[20rem]  xs:max-w-[25rem] md:max-w-[40rem] absolute max-sm:-top-2 top-2 md:top-0 left-10 sm:left-20 z-above-content"
            heading={heading}
          />
        )}

        <div
          ref={ref}
          className="grid w-full max-w-full grid-cols-12 grid-rows-[4rem_4rem_4rem_3rem_0rem_auto] md:grid-rows-[8rem_8rem_8rem_6rem_4rem_auto] gap-x-6 relative"
        >
          {videoTop && (
            <div className="col-start-1 col-end-8 row-start-1 row-end-4 z-content rounded-3xl overflow-hidden shadow-lg">
              <motion.video
                src={videoTop}
                initial="initial"
                transition={{ duration: 0.5, ease: "easeOut" }}
                animate={inView ? "animate" : "initial"}
                variants={{
                  initial: { opacity: 0.5 },
                  animate: { opacity: 1 },
                }}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {videoBottom && (
            <div className="col-start-6 col-end-13 row-start-3 row-end-7 z-base overflow-hidden shadow-lg rounded-3xl">
              <motion.video
                src={videoBottom}
                initial="initial"
                transition={{ duration: 0.5, ease: "easeOut" }}
                animate={inView ? "animate" : "initial"}
                variants={{
                  initial: { opacity: 0.5 },
                  animate: { opacity: 1 },
                }}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {text && (
            <div className="col-start-1 col-end-12 row-start-7 sm:col-end-6 sm:row-start-5 md:row-start-4 z-content flex items-end p-2 sm:p-4 sm:pt-8">
              <p className="md:text-xl mb-0">{text}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MediaGridWithText;
