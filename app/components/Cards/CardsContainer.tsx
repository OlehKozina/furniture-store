"use client";
import React, { useRef, useEffect } from "react";
import Heading from "../Heading";
import SearchBar from "./SearchBar";
import CardsGrid from "./CardsGrid";
import { useCategoryStore } from "@/stores/activeCategoryStore";
import { CardsType } from "@/types";

interface CardsContainerProps {
  heading?: string;
  cards: CardsType;
  categories?: {
    name: string;
    image?: string;
    _id?: string;
  }[];
  searchQuery: string;
  filteredCards: CardsType;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
}

const CardsContainer: React.FC<CardsContainerProps> = ({
  heading,
  searchQuery,
  filteredCards,
  onSearchChange,
  onClearSearch,
}) => {
  const activeCategory = useCategoryStore((state) => state.activeCategory);
  const cardsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeCategory && cardsSectionRef.current) {
      setTimeout(() => {
        cardsSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [activeCategory]);

  return (
    <div ref={cardsSectionRef}>
      {heading && (
        <Heading
          heading={heading}
          className="block mx-auto text-center mb-6 relative md:mb-12 whitespace-nowrap"
        />
      )}

      <SearchBar
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        filteredCardsLength={filteredCards.length}
        onSearchChange={onSearchChange}
        onClearSearch={onClearSearch}
      />

      <CardsGrid filteredCards={filteredCards} />
    </div>
  );
};

export default CardsContainer;
