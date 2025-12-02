"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useCategoryStore } from "@/stores/activeCategoryStore";

interface CategoryFilterProps {
  categories: {
    name: string;
    image?: string;
    _id?: string;
  }[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories }) => {
  const activeCategory = useCategoryStore((state) => state.activeCategory);
  const setActiveCategory = useCategoryStore(
    (state) => state.setActiveCategory
  );

  return (
    <div className="flex relative gap-4 flex-wrap container mx-auto justify-center">
      {categories.map((category) => (
        <button
          onClick={() =>
            setActiveCategory(
              activeCategory === category.name ? null : category.name
            )
          }
          key={category.name}
          className={clsx(
            "max-w-[21rem] text-start w-full bg-brand-card/60 rounded-lg p-4 flex flex-col justify-between gap-6 font-medium text-xl hover:shadow-lg transition-shadow",
            activeCategory === category.name && "shadow-lg !bg-brand-card/100"
          )}
        >
          {category.name}
          {category.image && (
            <Image
              width={150}
              className="mx-auto"
              height={200}
              src={category.image}
              alt={`${category.name} category`}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
