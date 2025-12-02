"use client";
import React, { useState } from "react";
import { CardsType } from "@/types";
import { useCardFilter } from "./useCardFilter";
import CategoryFilter from "./CategoryFilter";
import CardsContainer from "./CardsContainer";

interface CardsProps {
  heading?: string;
  cards?: CardsType;
  id?: string;
  categories?: {
    name: string;
    image?: string;
    _id?: string;
  }[];
}

const Cards: React.FC<CardsProps> = ({ heading, cards, id, categories }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!cards) return null;

  const { filteredCards } = useCardFilter({ cards, searchQuery });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <section className="py-5 md:py-12 relative -mt-[10rem]" id={id}>
      <div className="container flex flex-col gap-32">
        {categories && categories.length > 0 && (
          <CategoryFilter categories={categories} />
        )}

        <CardsContainer
          heading={heading}
          cards={cards}
          categories={categories}
          searchQuery={searchQuery}
          filteredCards={filteredCards}
          onSearchChange={handleSearchChange}
          onClearSearch={clearSearch}
        />
      </div>
    </section>
  );
};

export default Cards;
