import { PortableTextBlock } from "next-sanity";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import { PortableText } from "next-sanity";

const Benefits = ({
  heading,
  benefits,
}: {
  heading?: string;
  benefits?: {
    name?: string;
    image?: string;
    content?: PortableTextBlock;
  }[];
}) => {
  return (
    <section className="px-2 sm:container relative py-10 mx-auto">
      <Heading
        className="font-extrabold leading-tight text-3xl sm:text-4xl mb-6 text-center md:mb-10"
        heading={heading}
      />
      <div className="flex gap-4">
        {!!benefits?.length &&
          benefits?.map((benefit) => (
            <div className="flex gap-2" key={benefit.name}>
              {benefit.image && (
                <Image
                  src={benefit.image}
                  width={50}
                  height={50}
                  alt="benefit-icon"
                  className="object-contain"
                />
              )}
              <div className="flex flex-col gap-2">
                {benefit.name && <h4>{benefit.name}</h4>}
                {benefit.content && <PortableText value={benefit.content} />}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Benefits;
