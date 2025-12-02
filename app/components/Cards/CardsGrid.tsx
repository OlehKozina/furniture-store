import React from "react";
import Card from "./Card";
import { CardsType } from "@/types";

interface CardsGridProps {
  filteredCards: CardsType;
}

const CardsGrid: React.FC<CardsGridProps> = ({ filteredCards }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {filteredCards.length > 0 ? (
        filteredCards.map((card) => <Card key={card._id} {...card} />)
      ) : (
        <p className="text-brand-charcoal text-xl opacity-60">
          No items in this category.
        </p>
      )}
    </div>
  );
};

export default CardsGrid;
