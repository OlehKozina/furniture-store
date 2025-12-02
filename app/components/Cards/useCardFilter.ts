import { useMemo } from "react";
import { CardsType } from "@/types";
import { useCategoryStore } from "@/stores/activeCategoryStore";

interface UseCardFilterProps {
  cards: CardsType;
  searchQuery: string;
}

export const useCardFilter = ({ cards, searchQuery }: UseCardFilterProps) => {
  const activeCategory = useCategoryStore((state) => state.activeCategory);

  const filteredCards = useMemo(() => {
    let result = cards;

    if (activeCategory) {
      result = result.filter((card) => card.category === activeCategory);
    }

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

  return { filteredCards, activeCategory };
};
