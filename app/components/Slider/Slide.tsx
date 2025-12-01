import React from "react";
import Image from "next/image";
import { PortableTextBlock } from "next-sanity";
import { PortableText } from "next-sanity";
import { FaStar } from "react-icons/fa";

const Slide = ({
  image,
  content,
  name,
  rating,
}: {
  image?: string;
  content?: PortableTextBlock[];
  name?: string;
  rating?: number;
}) => {
  return (
    <div className="max-md:max-w-[20rem] group text-white font-medium mt-8 mb-4">
      <div className="relative w-full rounded-3xl overflow-hidden px-10 flex gap-6">
        <div className="p-6 flex-1 basis-2/3">
          <div className="flex flex-col gap-6 p-4 rounded-2xl">
            <div className="text-green text-6xl">❝</div>
            {rating && (
              <div className="flex gap-1 text-brand-gold text-xl">
                {Array.from({ length: rating }).map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>
            )}
            <div className="relative text-xs md:text-sm">
              {content && <PortableText value={content} />}
            </div>
            <div className="relative text-xl">{name}</div>
          </div>
        </div>
        {image && (
          <div className="flex-1 basis-1/3 relative object-cover">
            <Image
              src={image}
              alt={name || ""}
              width={350}
              height={460}
              className="w-full rounded-2xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;
