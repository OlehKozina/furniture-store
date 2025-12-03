"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const CartButton = () => {
  const { toggleCart, getTotalItems } = useCartStore();
  const [totalItems, setTotalItems] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTotalItems(getTotalItems());
  }, [getTotalItems]);

  const showBadge = isMounted && totalItems > 0;

  return (
    <button
      onClick={toggleCart}
      className="p-2 xs:p-4 rounded-2xl hover:bg-brand-green/10 transition-colors relative"
      aria-label="Cart"
    >
      <ShoppingCart className="w-7 h-7 text-green" />
      {showBadge && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;
