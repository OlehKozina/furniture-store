import type { CanScrollType } from "./useCarousel";
import type { ClassValue } from "clsx";
import React from "react";
import clsx from "clsx";
import { ArrowButton } from ".";

export interface SliderNavProps {
  canScroll?: CanScrollType;
  classNames?: {
    next?: ClassValue;
    previous?: ClassValue;
    root?: ClassValue;
  };
  scrollNext: () => void;
  scrollPrev: () => void;
}

export default function SliderNav({
  canScroll,
  classNames,
  scrollNext,
  scrollPrev,
}: SliderNavProps) {
  return (
    <div
      className={clsx(
        "z-above-content relative mt-2 flex w-full flex-row flex-nowrap justify-end gap-2",
        classNames?.root
      )}
    >
      <button
        aria-label="Previous Slide"
        className={clsx(
          "text-border duration-400 bg-surface-muted [&_svg]:stroke-theme hover:text-theme flex h-[4.25rem] w-[4.25rem] cursor-pointer appearance-none flex-row flex-nowrap items-center justify-center rounded-md opacity-100 transition-opacity ease-in-out [&_svg]:h-3 [&_svg]:w-3",
          !canScroll?.prev && "opacity-60",
          classNames?.previous
        )}
        onClick={scrollPrev}
        type="button"
      >
        <ArrowButton />
      </button>
      <button
        aria-label="Next Slide"
        className={clsx(
          "text-border duration-400 bg-surface-muted [&_svg]:stroke-theme hover:text-theme flex h-[4.25rem] w-[4.25rem] cursor-pointer appearance-none flex-row flex-nowrap items-center justify-center rounded-md opacity-100 transition-opacity ease-in-out [&_svg]:h-3 [&_svg]:w-3",
          !canScroll?.next && "opacity-60",
          classNames?.next
        )}
        onClick={scrollNext}
        type="button"
      >
        <ArrowButton />
      </button>
    </div>
  );
}
