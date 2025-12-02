"use client";
import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  activeCategory: string | null;
  filteredCardsLength: number;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  activeCategory,
  filteredCardsLength,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <div className="max-w-2xl mx-auto mb-8 md:mb-12 px-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search items..."
          className="w-full pl-10 pr-10 text-brand-charcoal placeholder:text-brand-default py-3 border border-brand-teal rounded-3xl focus:ring-2 focus:ring-brand-default focus:border-transparent outline-none transition-all"
        />
        {searchQuery && (
          <button
            onClick={onClearSearch}
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
            Found {filteredCardsLength} item
            {filteredCardsLength !== 1 ? "s" : ""}
            {activeCategory && ` in "${activeCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
