import { PortableTextBlock } from "next-sanity";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import { PortableText } from "next-sanity";

const Benefits = ({
  heading,
  benefits,
  id,
}: {
  heading?: string;
  id?: string;
  benefits?: {
    name?: string;
    image?: string;
    content?: PortableTextBlock;
  }[];
}) => {
  return (
    <section className="px-2 sm:container relative !py-20 mx-auto" id={id}>
      <Heading
        className="font-extrabold leading-tight text-3xl sm:text-4xl mb-6 text-center md:mb-10"
        heading={heading}
      />
      <div className="flex gap-8">
        {!!benefits?.length &&
          benefits?.map((benefit) => (
            <div className="flex gap-4 flex-1 basis-1/3" key={benefit.name}>
              {benefit.image && (
                <div className="w-[50px] h-[50px] shrink-0">
                  <Image
                    src={benefit.image}
                    alt="benefit-icon"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                {benefit.name && <h4 className="font-bold">{benefit.name}</h4>}
                {benefit.content && <PortableText value={benefit.content} />}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Benefits;
