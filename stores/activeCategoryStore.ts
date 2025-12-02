import { create } from "zustand";

interface CategoryStore {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  activeCategory: null,
  setActiveCategory: (category) => set({ activeCategory: category }),
}));
