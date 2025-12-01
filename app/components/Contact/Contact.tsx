"use client";
import React from "react";
import Heading from "../Heading";
import { PortableText, PortableTextBlock } from "next-sanity";
import Image from "next/image";

export interface ContactProps {
  heading?: string;
  id?: string;
  content?: PortableTextBlock;
  addresses?: {
    city?: string;
    address?: string;
    phone?: string;
  }[];
}

function Contact({ heading, content, addresses, id }: ContactProps) {
  return (
    <section
      className="py-5 md:py-12 relative overflow-hidden max-md:scroll-mt-16 bg-brand-tangerine"
      id={id}
    >
      <div className="container text-white text-center">
        <Heading
          className="font-extrabold leading-tight text-3xl sm:text-4xl mb-6 text-center"
          heading={heading}
        />
        {content && <PortableText value={content} />}
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
          <Image
            alt="canada-map"
            src="/canada-map.png"
            width={500}
            height={500}
          />
          <div className="flex flex-wrap justify-center gap-20">
            {!!addresses?.length &&
              addresses?.map((item) => (
                <div className="flex gap-2 max-w-[14rem]" key={item.city}>
                  <div className="flex flex-col gap-2">
                    {item.city && <h4>{item.city}</h4>}
                    {item.address && <p>{item.address}</p>}
                    {item.phone && (
                      <a
                        href={`tel:${item.phone}`}
                        className="inline-block px-4 py-2 border border-white rounded-xl text-white font-medium hover:bg-white hover:text-black transition-colors duration-300"
                      >
                        {item.phone}
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
