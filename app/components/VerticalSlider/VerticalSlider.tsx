"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Heading from "../Heading";
import { ArrowButton } from ".";
import clsx from "clsx";
import { PortableTextBlock } from "next-sanity";
import Slide from "./Slide";

interface VerticalSliderProps {
  _id: string;
  slides: {
    image: string;
    content: PortableTextBlock[];
    name: string;
    _key?: string;
  }[];
  heading?: string;
}

export default function Slider({ heading, slides, _id }: VerticalSliderProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    skipSnaps: false,
    align: "start",
    loop: true,
  });
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
      className="py-5 md:py-12 relative overflow-hidden max-md:scroll-mt-16 scroll-mt-10"
      id="formats"
    >
      <div className="container mx-auto px-4">
        <Heading heading={heading} className="mb-6 text-center md:mb-10" />
        <div className="relative max-w-[21rem] sm:max-w-[42rem] md:max-w-[69rem] mx-auto">
          <div
            className={clsx(
              "overflow-hidden",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            ref={emblaRef}
          >
            <div className="flex">
              {slides.map((slide) => {
                const { content, image, name } = slide;
                return (
                  <div
                    key={name}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.3333%] px-2"
                  >
                    <Slide {...{ content, image, name }} />
                  </div>
                );
              })}
            </div>
          </div>
          <ArrowButton direction="left" onClick={scrollPrev} />
          <ArrowButton direction="right" onClick={scrollNext} />
          <div className="flex mx-auto w-fit justify-center gap-2 mt-3 p-4 rounded-full bg-brand-dark">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 hover:scale-125 transition-all rounded-full ${
                  index === selectedIndex
                    ? "bg-brand-default"
                    : "bg-brand-light"
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
