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
}

const Card = ({ image, content, name }: CardProps) => {
  return (
    <div className="mb-4 text-brand-light text-2xl font-bold md:text-4xl">
      <div className="flex gap-4 list-none items-start">
        {image && <CardImage {...{ name, image }} />}
        {(name || content) && <CardContent {...{ name, content }} />}
      </div>
    </div>
  );
};

export default Card;
