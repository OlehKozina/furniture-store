import type { IconType } from "./SliderIcons";
import type { EmblaCarouselType } from "./useCarousel";
import type { ClassValue } from "clsx";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";

export type SliderPaginationProps = {
  activeIndex?: number | null;
  api?: EmblaCarouselType;
  classNames?: {
    button?: ClassValue;
    root?: ClassValue;
  };
  icons?: IconType[];
  onPaginationClick?: (index: number) => void;
  sectionProgress?: number;
  slides?: React.ReactNode[];
};

export default function SliderPagination({
  activeIndex,
  api,
  classNames,
  icons = [],
  onPaginationClick,
  slides = [],
}: SliderPaginationProps) {
  const paginationRef = useRef<HTMLDivElement>(null);

  if (slides.length < 2) return null;

  const handleClick = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    if (api) {
      onPaginationClick?.(index);
    }
  };

  useEffect(() => {
    if (!paginationRef.current || activeIndex === null) return;

    const activeButton = paginationRef.current.querySelector(
      `button:nth-child(${activeIndex! + 1})`
    );

    if (!(activeButton instanceof HTMLButtonElement)) return;

    if (activeIndex === 0) {
      paginationRef.current.scrollTo({
        behavior: "smooth",
        left: 0,
      });
      return;
    }

    if (activeIndex === slides.length - 1) {
      paginationRef.current.scrollTo({
        behavior: "smooth",
        left: paginationRef.current.scrollWidth,
      });
      return;
    }

    const buttonLeft = activeButton.offsetLeft;
    const buttonWidth = activeButton.clientWidth;
    const containerWidth = paginationRef.current.clientWidth;

    const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

    paginationRef.current.scrollTo({
      behavior: "smooth",
      left: scrollLeft,
    });
    return;
  }, [activeIndex, slides.length]);

  return (
    <div
      className={clsx(
        "z-above-content  mt-3 flex justify-between gap-1 overflow-hidden bg-yellow-50",
        "sm:mt-5 md:gap-2",
        classNames?.root
      )}
      ref={paginationRef}
    >
      {slides.map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            className={clsx(
              "group relative flex-[1_0_auto] cursor-pointer rounded-3xl bg-white py-0.5",
              "max-md:px-2 md:py-1",
              isActive && "!bg-neutral-900",
              classNames?.button
            )}
            key={`button-${index}`}
            onClick={(event) => handleClick(event, index)}
          >
            <span className="flex items-center justify-center">
              <div className="max-h-4 max-w-16 max-md:max-h-3">
                {icons[index] &&
                  React.createElement(icons[index], {
                    className: clsx(
                      "w-full h-full max-h-4 max-w-16 max-md:max-h-3",
                      isActive ? "fill-white" : "fill-neutral-900"
                    ),
                    isActive,
                  })}
              </div>
            </span>
          </button>
        );
      })}
    </div>
  );
}
