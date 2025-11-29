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
    <div className="max-md:max-w-[20rem] group text-white font-medium mt-8 mb-4 aspect-square">
      <div className="relative w-full h-full rounded-3xl overflow-hidden p-10 flex gap-6">
        {/* TEXT — 2/3 */}
        <div className="p-6 flex-1 basis-2/3">
          <div className="flex flex-col gap-6 p-4 rounded-2xl">
            <div className="relative text-xs md:text-sm">
              {content && <PortableText value={content} />}
            </div>
            <div className="relative text-xl">{name}</div>
          </div>
        </div>

        {/* IMAGE — 1/3 */}
        {image && (
          <div className="flex-1 basis-1/3">
            <Image
              src={image}
              alt={name || ""}
              width={350}
              height={460}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;
