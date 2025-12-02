"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { ArrowButton } from ".";
import clsx from "clsx";
import { PortableTextBlock } from "next-sanity";
import Slide from "./Slide";

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: false, align: "start" },
    [Fade()]
  );
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("pointerDown", () => setIsDragging(true));
    emblaApi.on("pointerUp", () => setIsDragging(false));
    emblaApi.on("select", () => setIsDragging(false));
  }, [emblaApi]);

  return (
    <section
      className="py-5 md:py-12 relative overflow-hidden max-md:scroll-mt-16 bg-brand-charcoal"
      id={id}
    >
      <div className="container mx-auto px-4 bg-opacity-80 rounded-3xl">
        <div className="relative max-w-[21rem] sm:max-w-[42rem] md:max-w-[60rem] mx-auto">
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
          <div className="flex mx-auto w-fit justify-center gap-2 mt-3 p-4 rounded-full bg-brand-teal">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 hover:scale-125 transition-all rounded-full ${
                  index === selectedIndex
                    ? "bg-brand-charcoal"
                    : "bg-brand-tangerine"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
