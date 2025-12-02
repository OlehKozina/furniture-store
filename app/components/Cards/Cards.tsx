"use client";
import React from "react";
import { CardsType } from "@/types";
import Card from "./Card";
import Heading from "../Heading";
import Image from "next/image";

export default function Cards({
  heading,
  cards,
  id,
  categories,
}: {
  cards?: CardsType;
  heading?: string;
  id?: string;
  categories?: {
    name?: string;
    image?: string;
    _id?: string;
  }[];
}) {
  if (!cards) return;

  return (
    <section className="py-5 md:py-12 relative -mt-[10rem]" id={id}>
      <div className="container flex flex-col gap-32">
        <div className="flex relative gap-4 flex-wrap container mx-auto justify-center">
          {!!categories?.length &&
            categories.map((category) => (
              <div
                key={category.name}
                className="max-w-[21rem] w-full bg-brand-card rounded-lg p-4 flex flex-col justify-between gap-6 font-medium text-xl"
              >
                {category.name}
                {category.image && (
                  <Image
                    width={150}
                    className="mx-auto"
                    height={200}
                    src={category.image}
                    alt="furniture-item"
                  />
                )}
              </div>
            ))}
        </div>
        <div>
          {heading && (
            <Heading
              heading={heading}
              className="block mx-auto text-center mb-6 relative md:mb-20 whitespace-nowrap"
            />
          )}
          <div className="flex flex-wrap gap-6 justify-center">
            {!!cards?.length &&
              cards.map((card) => {
                const { _key, ...props } = card;
                return <Card key={_key} {...props} />;
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
