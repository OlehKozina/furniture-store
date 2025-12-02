import React from "react";
import Image from "next/image";
import { PortableTextBlock, PortableText } from "next-sanity";

const Benefit = ({
  name,
  image,
  content,
}: {
  name?: string;
  image?: string;
  content?: PortableTextBlock;
}) => {
  return (
    <div className="flex gap-4" key={name}>
      {image && (
        <div className="shrink-0">
          <Image
            src={image}
            alt="icon"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        {name && <h4 className="font-bold">{name}</h4>}
        {content && <PortableText value={content} />}
      </div>
    </div>
  );
};

export default Benefit;
