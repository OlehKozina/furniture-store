import { PortableTextBlock } from "next-sanity";
import React from "react";
import Heading from "../Heading";
import Benefit from "./Benefit";

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
    <section className="px-2 relative !py-20 bg-brand-teal" id={id}>
      <div className="sm:container flex flex-col gap-4">
        {heading && (
          <Heading
            className="font-extrabold leading-tight text-3xl sm:text-4xl mb-6 text-center md:mb-10"
            heading={heading}
          />
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {!!benefits?.length &&
            benefits?.map((benefit) => {
              return <Benefit {...benefit} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
