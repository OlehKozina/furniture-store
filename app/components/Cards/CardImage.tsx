import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const CardImage = ({ image, name }: { image?: string; name?: string }) => {
  if (!image) return null;
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  React.useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={imageVariants}
      className="relative w-full h-full p-6"
    >
      <Image
        src={image}
        alt={name || "Furniture"}
        fill
        className="object-contain"
      />
    </motion.div>
  );
};

export default CardImage;
