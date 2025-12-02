import React from "react";
import Image from "next/image";

const CardImage = ({ image, name }: { image?: string; name?: string }) => {
  if (!image) return null;
  return (
    <div className="relative w-full h-full p-6">
      <Image
        src={image}
        alt={name || "Furniture"}
        fill
        className="object-contain"
      />
    </div>
  );
};

export default CardImage;
