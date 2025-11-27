import React from "react";
import Image from "next/image";
import { PortableTextBlock } from "next-sanity";
import { PortableText } from "next-sanity";

const Slide = ({
  image,
  content,
  name,
}: {
  image?: string;
  content?: PortableTextBlock[];
  name?: string;
}) => {
  return (
    <div className="max-md:max-w-[20rem] group text-white font-medium mt-8 mb-4 hover:scale-105 transition-transform aspect-[349/444]">
      <div className="relative w-full h-full rounded-3xl overflow-hidden p-10">
        {image && (
          <Image
            src={image}
            alt={name || ""}
            layout="responsive"
            width={349}
            height={444}
            className="absolute inset-0"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-brand-dark group-hover:to-black/90 transition-all" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex flex-col gap-6 p-4 bg-black rounded-2xl bg-opacity-60">
            <div className="relative text-xl md:text-2xl">{name}</div>
            <div className="relative text-xs md:text-sm">
              {content && <PortableText value={content} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
