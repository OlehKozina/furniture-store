"use client";
import React from "react";
import clsx from "clsx";
import Image from "next/image";

const Gallery = ({
  images,
}: {
  images?: { _key?: string; url?: string }[];
}) => {
  return (
    <div className="box-mt xxs:px-4 mb-[3.75rem] px-2 sm:mb-2 sm:px-2">
      <div className="mx-auto block w-full">
        <div className="relative grid grid-cols-2 gap-2 sm:gap-4 lg:gap-6">
          {images?.map((image, index) => (
            <div
              key={image._key || index}
              className={clsx(
                "relative w-full aspect-square",
                index === 0 ? "col-span-2" : "col-span-1"
              )}
            >
              <Image
                src={image.url || ""}
                alt="Gallery image"
                fill
                className="object-cover rounded-lg"
                sizes={
                  index === 0
                    ? "(min-width: 1024px) 100vw, 100vw"
                    : "(min-width: 1024px) 50vw, 100vw"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
