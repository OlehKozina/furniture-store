import React from "react";
import { CardsType } from "@/types";
import Card from "./Card";
import Heading from "../Heading";

export default function Cards({
  heading,
  cards,
  _id,
}: {
  cards?: CardsType;
  heading?: string;
  _id?: string;
}) {
  if (!cards) return;

  return (
    <section
      className="py-5 md:py-12 relative overflow-hidden max-md:scroll-mt-16 scroll-mt-12"
      id="bakers"
    >
      <div className="container">
        {heading && (
          <Heading
            heading={heading}
            className="block mx-auto text-center mb-6 relative md:mb-20 whitespace-pre-line"
          />
        )}
        <div className="list-none justify-center flex gap-8 flex-wrap sm:justify-center">
          {!!cards?.length &&
            cards.map((card) => {
              const { _key, name, content, image } = card;
              return <Card key={_key} {...{ name, content, image }} />;
            })}
        </div>
      </div>
    </section>
  );
}
