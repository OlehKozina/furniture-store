"use client";
import React from "react";
import { PortableTextBlock } from "@portabletext/react";
import CardContent from "./CardContent";
import CardImage from "./CardImage";
import { FaStar } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCartStore } from "@/stores/cartStore";

interface CardProps {
  _id?: string;
  image?: string;
  content?: PortableTextBlock[];
  name?: string;
  price?: number;
  oldPrice?: number;
  rating?: number;
}

const Card = ({
  image,
  content,
  name,
  price,
  oldPrice,
  rating,
  _id,
}: CardProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const addItem = useCartStore((state) => state.addItem);
  React.useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const handleAddToCart = () => {
    if (!_id || !name || !image || !price) {
      console.error("Missing required item data");
      return;
    }

    addItem({
      id: _id,
      name,
      image,
      price,
    });
  };
  return (
    <div className="relative group mb-4 text-2xl font-bold max-w-[15rem] w-full">
      <div className="flex flex-col gap-4 list-none items-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={imageVariants}
          className="relative bg-brand-card rounded-lg p-4 w-full aspect-square hover:shadow-lg transition-shadow"
        >
          {image && <CardImage {...{ name, image }} />}
          <button
            onClick={handleAddToCart}
            className="
          absolute p-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-brand-charcoal text-white rounded-xl
          opacity-0 group-hover:opacity-100  shadow-lg
          transition-opacity duration-300 whitespace-nowrap
          pointer-events-none group-hover:pointer-events-auto text-base
        "
          >
            + Add to cart
          </button>
        </motion.div>

        {price && (
          <div className="flex items-center gap-3">
            <p className="text-green text-xl font-semibold">${price}</p>
            {oldPrice && (
              <p className="text-gray-500 text-lg line-through opacity-60">
                ${oldPrice}
              </p>
            )}
          </div>
        )}
        {(name || content) && <CardContent {...{ name, content }} />}
        {rating && (
          <div className="flex gap-1 text-xl">
            {Array.from({ length: rating }).map((_, idx) => (
              <FaStar key={`filled-${idx}`} className="text-brand-gold" />
            ))}
            {Array.from({ length: 5 - rating }).map((_, idx) => (
              <FaStar key={`empty-${idx}`} className="text-brand-card" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
