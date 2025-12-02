"use client";
import React from "react";
import Heading from "../Heading";
import { PortableText, PortableTextBlock } from "next-sanity";
import Image from "next/image";
import Address from "./Address";

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
      <div className="container text-brand-charcoal text-center">
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
              addresses?.map((item) => <Address {...item} key={item.city} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
