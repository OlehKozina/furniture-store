"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const CartButton = () => {
  const { toggleCart, getTotalItems } = useCartStore();

  return (
    <button
      onClick={toggleCart}
      className="p-4 rounded-2xl hover:bg-brand-green/10 transition-colors relative"
      aria-label="Cart"
    >
      <ShoppingCart className="w-7 h-7 text-green" />
      {getTotalItems() > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {getTotalItems()}
        </span>
      )}
    </button>
  );
};

export default CartButton;
