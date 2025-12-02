"use client";
import React from "react";
import { PortableTextBlock } from "@portabletext/react";
import CardContent from "./CardContent";
import CardImage from "./CardImage";
import { FaStar } from "react-icons/fa";

interface CardProps {
  _key?: string;
  image?: string;
  content?: PortableTextBlock[];
  name?: string;
  price?: number;
  oldPrice?: number;
  rating?: number;
}

const Card = ({ image, content, name, price, oldPrice, rating }: CardProps) => {
  return (
    <div className="relative group mb-4 text-2xl font-bold max-w-[15rem] w-full">
      <div className="flex flex-col gap-4 list-none items-center">
        <div className="relative bg-brand-card rounded-lg p-4">
          {image && <CardImage {...{ name, image }} />}
          <button
            onClick={() => console.log("Add to cart:", name)}
            className="
          absolute p-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-brand-charcoal text-white rounded-xl
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 whitespace-nowrap
          pointer-events-none group-hover:pointer-events-auto
        "
          >
            + Add to cart
          </button>
        </div>

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
          <div className="flex gap-1 text-brand-gold text-xl">
            {Array.from({ length: rating }).map((_, idx) => (
              <FaStar key={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
