"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { ArrowButton } from ".";
import clsx from "clsx";
import { PortableTextBlock } from "next-sanity";
import Slide from "./Slide";
import SliderDots from "./SliderDots";
import { useCarouselControls } from "./utils";

interface SliderProps {
  id: string;
  slides: {
    image: string;
    content: PortableTextBlock[];
    name: string;
    _key?: string;
    rating?: number;
  }[];
}

export default function Slider({ slides, id }: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: false, align: "start" },
    [Fade()]
  );

  const {
    selectedIndex,
    scrollSnaps,
    isDragging,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = useCarouselControls(emblaApi);

  return (
    <section
      className="py-5 md:py-12 relative overflow-hidden max-md:scroll-mt-16 bg-brand-charcoal"
      id={id}
    >
      <div className="container mx-auto px-4 bg-opacity-80 rounded-3xl">
        <div className="relative max-w-[21rem] xs:max-w-[42rem] md:max-w-[60rem] mx-auto">
          <div
            className={clsx(
              "overflow-hidden",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            ref={emblaRef}
          >
            <div className="flex">
              {slides.map((slide) => {
                const { content, image, name, rating } = slide;
                return (
                  <div
                    key={name}
                    className="flex-[0_0_100%] px-2 transition-opacity duration-medium ease-in-out"
                  >
                    <Slide {...{ content, image, name, rating }} />
                  </div>
                );
              })}
            </div>
          </div>
          <ArrowButton direction="left" onClick={scrollPrev} />
          <ArrowButton direction="right" onClick={scrollNext} />
          {!!scrollSnaps?.length && (
            <SliderDots
              onDotClick={scrollTo}
              scrollSnaps={scrollSnaps}
              selectedIndex={selectedIndex}
            />
          )}
        </div>
      </div>
    </section>
  );
}
