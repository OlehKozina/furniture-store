"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { CardsType } from "@/types";
import Card from "./Card";
import Heading from "../Heading";
import Image from "next/image";
import clsx from "clsx";
import { useCategoryStore } from "@/stores/activeCategoryStore";
import { Search } from "lucide-react";

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
    name: string;
    image?: string;
    _id?: string;
  }[];
}) {
  if (!cards) return;
  const activeCategory = useCategoryStore((state) => state.activeCategory);
  const setActiveCategory = useCategoryStore(
    (state) => state.setActiveCategory
  );
  const [searchQuery, setSearchQuery] = useState("");
  const cardsSectionRef = useRef<HTMLDivElement>(null);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };
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
  const filteredCards = useMemo(() => {
    let result = activeCategory
      ? cards.filter((card) => card.category === activeCategory)
      : cards;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((card) => {
        return (
          card.name?.toLowerCase().includes(query) ||
          card.category?.toLowerCase().includes(query)
        );
      });
    }

    return result;
  }, [cards, activeCategory, searchQuery]);
  return (
    <section className="py-5 md:py-12 relative -mt-[10rem]" id={id}>
      <div className="container flex flex-col gap-32">
        <div className="flex relative gap-4 flex-wrap container mx-auto justify-center">
          {!!categories?.length &&
            categories.map((category) => (
              <button
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category.name ? null : category.name
                  )
                }
                key={category.name}
                className={clsx(
                  "max-w-[21rem] text-start w-full bg-brand-card/60 rounded-lg p-4 flex flex-col justify-between gap-6 font-medium text-xl hover:shadow-lg transition-shadow",
                  activeCategory === category.name &&
                    "shadow-lg !bg-brand-card/100"
                )}
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
              </button>
            ))}
        </div>
        <div ref={cardsSectionRef}>
          {heading && (
            <Heading
              heading={heading}
              className="block mx-auto text-center mb-6 relative md:mb-12 whitespace-nowrap"
            />
          )}
          <div className="max-w-2xl mx-auto mb-8 md:mb-12 px-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search items..."
                className="w-full pl-10 pr-10 text-brand-charcoal placeholder:text-brand-default py-3 border border-brand-teal rounded-3xl focus:ring-2 focus:ring-brand-default focus:border-transparent outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Clear search"
                >
                  <span className="text-brand-charcoal/70 hover:text-brand-charcoal text-xl">
                    ×
                  </span>
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-brand-charcoal">
                <p>
                  Found {filteredCards.length} item
                  {filteredCards.length !== 1 ? "s" : ""}
                  {activeCategory && ` in "${activeCategory}"`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {!!filteredCards?.length ? (
              filteredCards.map((card) => {
                return <Card key={card._id} {...card} />;
              })
            ) : (
              <p className="text-brand-charcoal text-xl opacity-60">
                No items in this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
