"use client";
import React from "react";
import { PortableTextBlock } from "@portabletext/react";
import CardContent from "./CardContent";
import CardImage from "./CardImage";

interface CardProps {
  _key?: string;
  image?: string;
  content?: PortableTextBlock[];
  name?: string;
  price?: number;
  oldPrice?: number;
}

const Card = ({ image, content, name, price, oldPrice }: CardProps) => {
  return (
    <div className="relative group mb-4 text-2xl font-bold">
      <div className="flex flex-col gap-4 list-none items-start">
        {image && <CardImage {...{ name, image }} />}
        {(name || content) && <CardContent {...{ name, content }} />}
        {price && (
          <div className="flex items-center gap-3">
            <p className="text-brand-orange text-xl font-semibold">${price}</p>
            {oldPrice && (
              <p className="text-gray-500 text-lg line-through opacity-60">
                ${oldPrice}
              </p>
            )}
          </div>
        )}
      </div>
      <button
        onClick={() => console.log("Add to cart:", name)}
        className="
          absolute inset-0 m-auto h-12 w-40
          bg-brand-orange text-white font-semibold rounded-xl
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 
          pointer-events-none group-hover:pointer-events-auto
          flex items-center justify-center
        "
      >
        Add to cart
      </button>
    </div>
  );
};

export default Card;
