"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PawPrint } from "../Icons";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prints, setPrints] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  useEffect(() => {
    let id = 0;
    const stepX = 60;
    const stepY = 40;
    const offset = 40;
    const startY = window.innerHeight - 100;
    const topLimit = -20;

    const interval = setInterval(() => {
      setPrints((prev) => {
        const nextY =
          startY - prev.length * stepY + (prev.length % 2 === 0 ? -10 : 10);

        if (nextY <= topLimit) {
          clearInterval(interval);
          return prev;
        }

        return [
          ...prev,
          {
            id: id++,
            x: prev.length * stepX + (prev.length % 2 === 1 ? offset : 0),
            y: nextY + (prev.length % 2 === 1 ? offset : 0),
          },
        ];
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden -mt-[--header-height]">
      <img
        src="/sand_bg.jpg"
        alt="sand background"
        className="fixed top-0 left-0 z-under min-h-screen"
      />
      <img
        src="/dog-cropped.png"
        alt="brown-dog"
        className="fixed right-0 top-1/4 z-0 max-w-[10rem]"
      />
      {prints.map((print) => (
        <motion.div
          key={print.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="fixed pointer-events-none z-under"
          style={{ left: `${print.x}px`, top: `${print.y}px` }}
        >
          <PawPrint className="w-12 h-12 text-black/20" />
        </motion.div>
      ))}
      {children}
    </div>
  );
}
