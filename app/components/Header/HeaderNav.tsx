import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useCategoryStore } from "@/stores/activeCategoryStore";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";

const HeaderNav = ({
  navigation,
  activeSection,
}: {
  navigation?: {
    title?: string;
    slug?: string;
    sublinks?: {
      name?: string;
    }[];
  }[];
  activeSection?: string | null;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const { activeCategory, setActiveCategory } = useCategoryStore();

  const {
    items,
    isOpen,
    toggleCart,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();
  function generateId(title?: string) {
    if (title)
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
  }
  return (
    <nav className="flex items-center flex-grow gap-10">
      <a href="#" className="z-cover relative p-4">
        <Image src="/logo.png" alt="furniture_logo" width={50} height={50} />
      </a>
      <motion.ul
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="hidden md:flex text-brand-charcoal list-none flex-grow justify-center text-lg lg:text-xl font-extrabold px-20"
      >
        {navigation?.map((link, index) => {
          const linkRef = React.useRef<HTMLAnchorElement | null>(null);
          const isActive = activeSection === generateId(link?.title || "");
          const hasSublinks = link.sublinks && link.sublinks.length > 0;
          return (
            <motion.li
              key={link.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              className={clsx(
                "relative flex flex-col items-center flex-1 hover:shadow-lg group",
                isActive && "shadow-lg bg-brand-default bg-opacity-80"
              )}
            >
              <a
                ref={linkRef}
                className={clsx("no-underline p-[1.75rem] transition-all")}
                href={`#${generateId(link?.slug)}`}
              >
                {link.title}
              </a>
              {hasSublinks && (
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-full bg-white z-50 flex flex-col"
                    >
                      {link.sublinks?.map((sublink, i) => (
                        <motion.a
                          key={sublink.name}
                          href={`#${generateId(sublink.name)}`}
                          onClick={() => {
                            setActiveCategory(sublink.name ?? null);
                          }}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{
                            duration: 0.2,
                            delay: i * 0.05,
                          }}
                          className={clsx(
                            "px-6 py-3 hover:bg-green/20 whitespace-nowrap text-sm text-brand-charcoal hover:shadow-lg",
                            activeCategory === sublink.name && "bg-green/20"
                          )}
                        >
                          {sublink.name}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
      <div className="relative">
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
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/50 z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full md:w-96 bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-brand-charcoal">
                  Shopping Cart
                </h2>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ShoppingCart className="w-20 h-20 mb-4 opacity-30" />
                    <p className="text-lg">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 border rounded-lg"
                      >
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-contain w-full h-full"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-brand-charcoal truncate">
                            {item.name}
                          </h3>
                          <p className="text-green font-bold">${item.price}</p>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 border rounded">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto p-1 hover:bg-red-50 text-red-500 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {items.length > 0 && (
                <div className="border-t p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-green">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      console.log("Checkout:", items);
                    }}
                    className="w-full bg-green text-white py-3 rounded-lg font-semibold hover:bg-green/90 transition-colors"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={() => useCartStore.getState().clearCart()}
                    className="w-full mt-2 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default HeaderNav;
