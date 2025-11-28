"use client";
import React from "react";
import Heading from "../Heading";
import { PortableText, PortableTextBlock } from "next-sanity";
import Image from "next/image";

export interface ContactProps {
  heading?: string;
  content?: PortableTextBlock;
  addresses?: {
    city?: string;
    address?: string;
    phone?: string;
  }[];
}

function Contact({ heading, content, addresses, ...props }: ContactProps) {
  console.log("props", props);
  return (
    <section
      className="py-5 md:py-12 relative overflow-hidden max-md:scroll-mt-16 bg-black"
      id="contact"
    >
      <div className="container text-white text-center">
        <Heading
          className="font-extrabold leading-tight text-3xl sm:text-4xl mb-6 text-center"
          heading={heading}
        />
        {content && <PortableText value={content} />}
        <div className="flex flex-col items-center gap-6 pb-0 md:flex-row md:gap-10 md:pb-24">
          <Image
            alt="canada-map"
            src="/canada-map.png"
            width={500}
            height={500}
          />
          {!!addresses?.length &&
            addresses?.map((item) => (
              <div className="flex gap-2" key={item.city}>
                <div className="flex flex-col gap-2">
                  {item.city && <h4>{item.city}</h4>}
                  {item.address && <p>{item.address}</p>}
                  {item.phone && <p>{item.phone}</p>}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
