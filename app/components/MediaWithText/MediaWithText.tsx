"use client";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import React from "react";
import Heading from "../Heading";
import Illustration from "./Illustration";

interface MediaWithTextProps {
  _id?: string;
  heading?: string;
  content?: PortableTextBlock;
  image?: string;
  horizontalImage?: string;
}

function MediaWithText({
  heading,
  content,
  horizontalImage,
  image,
  _id,
}: MediaWithTextProps) {
  return (
    <section
      className="my-10 md:my-20 text-sm md:text-base relative overflow-hidden scroll-mt-10 max-md:scroll-mt-16 px-6"
      id="trust"
    >
      <div className="container relative bg-brand-dark rounded-3xl bg-opacity-80 py-10">
        <div className="flex flex-col lg:flex-row items-start max-lg:items-center justify-center gap-10 lg:gap-0 lg:space-x-10 text-base lg:text-xl">
          <div className="max-w-[35rem] lg:max-w-[40rem]">
            <Heading
              heading={heading}
              className="mb-6 mx-auto text-center md:mb-10 whitespace-pre-line"
            />
            {content && (
              <div className="mb-5">
                <PortableText value={content} />
              </div>
            )}
          </div>
          <div className="max-w-[25rem] w-full hidden lg:block">
            <Illustration
              image={image}
              className="rounded-3xl"
              width={450}
              height={300}
            />
          </div>
          <div className="max-w-[35rem] w-full block lg:hidden">
            <Illustration
              image={horizontalImage}
              className="rounded-3xl"
              width={450}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MediaWithText;
