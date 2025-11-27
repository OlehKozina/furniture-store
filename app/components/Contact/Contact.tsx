"use client";
import React from "react";
import Form from "../Form";
import { FormType } from "@/types";
import { PortableTextBlock } from "next-sanity";

export interface ContactProps {
  _id?: string;
  heading?: string;
  form?: FormType;
  direction?: string;
  privacyPolicy?: PortableTextBlock;
}

function Contact({
  heading,
  form,
  direction,
  privacyPolicy,
  _id,
}: ContactProps) {
  return (
    <section
      className="py-5 md:py-12 relative overflow-hidden max-md:scroll-mt-16"
      id="contact"
    >
      <div className="container">
        <div className="flex flex-col items-center gap-6 pb-0 md:flex-row md:gap-10 md:pb-24">
          <Form
            heading={heading}
            form={form}
            className="!p-8 bg-opacity-50"
            privacyPolicy={privacyPolicy}
          />
          <iframe
            className="flex-shrink-0 max-md:h-[15rem] md:aspect-square -mx-6 rounded-3xl w-full border-none md:mx-auto md:max-w-[30rem] lg:max-w-[38rem]"
            src={direction}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default Contact;
