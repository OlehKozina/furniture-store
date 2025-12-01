import React from "react";
import { CardsType } from "@/types";
import Card from "./Card";
import Heading from "../Heading";

export default function Cards({
  heading,
  cards,
  id,
}: {
  cards?: CardsType;
  heading?: string;
  id?: string;
}) {
  if (!cards) return;

  return (
    <section
      className="py-5 md:py-12 relative overflow-hidden max-md:scroll-mt-16 scroll-mt-12"
      id={id}
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
              const { _key, ...props } = card;
              return <Card key={_key} {...props} />;
            })}
        </div>
      </div>
    </section>
  );
}
//     <div className="flex relative gap-4 flex-wrap container mx-auto justify-center">{!!cards?.length &&
// cards.map((card) => (
//   <div
//     key={card.name}
//     className="max-w-[21rem] w-full bg-brand-card rounded-lg p-4 flex flex-col justify-between"
//   >
//     {card.name}
//     {card.image && (
//       <Image
//         width={150}
//         className="mx-auto"
//         height={200}
//         src={card.image}
//         alt="furniture-item"
//       />
//     )}
//   </div>
// ))}</div>
