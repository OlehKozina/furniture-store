import type { SliderNavProps } from "./SliderNav";
import type { SliderPaginationProps } from "./SliderPagination";
import type { IconType } from "./SliderIcons";
import type { CarouselConfigType } from "./useCarousel";
import type { ClassValue } from "clsx";
import type { EmblaCarouselType } from "embla-carousel";
import React, { useEffect } from "react";
import clsx from "clsx";
import { m } from "framer-motion";
import useCarousel from "./useCarousel";
import SliderPagination from "./SliderPagination";
import { PortableTextBlock } from "sanity";
import Image from "next/image";

export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  activeIndex?: number;
  children?: React.ReactNode[];
  className?: ClassValue;
  classNames?: {
    navigation?: SliderNavProps["classNames"];
    pagination?: SliderPaginationProps["classNames"];
    root?: ClassValue;
    slide?: ClassValue;
    slides?: ClassValue;
  };
  config?: CarouselConfigType;
  icons?: IconType[];
  onApiReady?: (api: EmblaCarouselType) => void;
  onHeightChange?: (height: number) => void;
  onPaginationClick?: (index: number) => void;
  pagination?: boolean;
  scrollDirection?: "down" | "up";
  sectionProgress?: number;
  slides?: {
    name?: string;
    image?: string;
    content?: PortableTextBlock;
  }[];
  heading?: string;
}

const Slider = ({
  children,
  className,
  classNames,
  config,
  icons = [],
  onApiReady,
  onHeightChange,
  onPaginationClick,
  pagination = false,
  scrollDirection,
  sectionProgress,
  slides: slidesOrg,
  heading,
  ...props
}: SliderProps) => {
  if (!slidesOrg?.length && !children) return null;
  const slides = slidesOrg;
  const { api, height, indices, ref } = useCarousel({
    align: "start",
    autoHeight: true,
    axis: "y",
    dragFree: false,
    ...config,
  });

  useEffect(() => {
    if (api && onApiReady) {
      onApiReady(api);
    }
  }, [api, onApiReady]);

  useEffect(() => {
    if (!height || !onHeightChange) return;

    const numericHeight = parseFloat(height);
    if (!isNaN(numericHeight)) {
      onHeightChange(numericHeight);
    }
  }, [height, onHeightChange]);

  return (
    <div
      className={clsx(
        "max-w-cols10 relative flex w-full flex-wrap overflow-hidden",
        classNames?.root || className
      )}
      {...props}
    >
      <div className="flex grow gap-3 px-6 max-md:px-8 max-sm:flex-col max-sm:px-3">
        <div className="flex h-full basis-[50%] flex-col md:basis-[40%]">
          <div className="flex items-center justify-center py-0 sm:py-6 md:py-8">
            <h2
              className={clsx(
                "type-h1 max-w-cols4 border-l-2 border-red-500 pl-3",
                "md:pl-6 md:text-7xl md:leading-[5rem]"
              )}
            >
              {heading}
            </h2>
          </div>
        </div>
        <div
          className="max-w-cols6 pointer-events-none basis-[50%] md:basis-[60%] relative z-overlay"
          ref={ref}
        >
          <div
            className={clsx("relative w-full flex-col", classNames?.slides)}
            style={{ height }}
          >
            {!!slides?.length &&
              slides.map((slide, index) => {
                const { name, image, content } = slide;
                const isActive = index === indices.active;
                let translateYValue = 0;
                if (!isActive) {
                  translateYValue = scrollDirection === "down" ? 20 : -20;
                }
                return (
                  <m.div
                    animate={{
                      opacity: isActive ? 1 : 0,
                      translateY: translateYValue,
                    }}
                    className={clsx(
                      "absolute left-0 top-0 w-full flex-[0_0_auto] first:mt-0",
                      classNames?.slide
                    )}
                    initial={{ opacity: 0, translateY: -20 }}
                    key={index}
                    transition={{ duration: 0.5, ease: "linear" }}
                  >
                    {name}
                    {image && (
                      <Image
                        src={image}
                        alt="service"
                        width={400}
                        height={200}
                      />
                    )}
                  </m.div>
                );
              })}
          </div>
        </div>
      </div>

      <m.div
        animate={{
          background: `linear-gradient(to left, white ${
            (1 - (sectionProgress ?? 0)) * 100
          }%, black ${(1 - (sectionProgress ?? 0)) * 100}%)`,
        }}
        className="z-10 mt-3 h-[2px] w-full max-md:mx-6 max-sm:mx-3"
        transition={{ duration: 0.3 }}
      />

      {pagination && (
        <div className="z-10 w-full bg-yellow-50">
          {/* <SliderPagination
            activeIndex={indices.active}
            api={api}
            classNames={classNames?.pagination}
            icons={icons}
            onPaginationClick={onPaginationClick}
            slides={slides}
          /> */}
        </div>
      )}
    </div>
  );
};

export default Slider;
