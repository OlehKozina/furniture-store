import React, { useState, useId, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";

type IllustrationProps = {
  className?: string;
  image?: string;
  height?: number;
  width?: number;
};

const Illustration = ({
  className,
  image,
  height = 590,
  width = 393,
}: IllustrationProps) => {
  if (!image) return null;
  const mediaID = useId();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [randomRotation] = useState(
    90 * Math.floor(Math.random() * Math.floor(4))
  );

  const [isVisible, setVisible] = useState("hidden");
  useEffect(() => {
    if (inView && isVisible === "hidden") {
      setVisible("visible");
    }

    if (!inView && isVisible === "visible") {
      setVisible("hidden");
    }
  }, [inView]);
  const controls = useAnimation();
  React.useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  return (
    <svg className={className} ref={ref} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <mask
          id={`masking-${mediaID}`}
          maskContentUnits="objectBoundingBox"
          maskUnits="objectBoundingBox"
        >
          <path
            clipRule="evenodd"
            d="M0 0h1v1H0z"
            fill="#000"
            fillRule="evenodd"
          />
          <motion.path
            animate={isVisible}
            d="M-0.035 -0.038L1.013 1.013 0 1 1.013 0.561 -0.067 0.487 1.129 -0.038 0.034 0.806 1 0.353 0.328 -0.038"
            fill="none"
            initial="hidden"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth=".6"
            style={{ originX: "0.5px", originY: "0.5px" }}
            variants={{
              hidden: {
                pathLength: 0,
                rotate: `${randomRotation}deg`,
              },
              visible: {
                pathLength: 1,
                rotate: `${randomRotation}deg`,
                transition: {
                  duration: 1.5,
                  ease: "easeIn",
                },
              },
            }}
          />
        </mask>
      </defs>
      <foreignObject
        className={isVisible === "hidden" ? "invisible" : "visible"}
        height="100%"
        mask={`url(#masking-${mediaID})`}
        width="100%"
        x="0"
        y="0"
      >
        <Image alt="baker" src={image} width={width} height={height} />
      </foreignObject>
    </svg>
  );
};

export default dynamic(() => Promise.resolve(Illustration), { ssr: false });
