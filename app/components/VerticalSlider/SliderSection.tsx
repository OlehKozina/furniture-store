"use client";
import type { EmblaCarouselType } from "embla-carousel";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { calculateProgress, getSectionTop } from "./utils";
import Slider from "./Slider";
import { PortableTextBlock } from "sanity";
import { PortableText } from "next-sanity";

type IconWithText = {
  text?: string;
};

interface SliderSectionProps {
  heading?: string;
  slides?: {
    name?: string;
    image?: string;
    content?: PortableTextBlock;
  }[];
}

const SliderSection = ({ heading, slides: _slides }: SliderSectionProps) => {
  if (!_slides) return;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const previousScrollY = useRef(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      previousScrollY.current = window.scrollY;
    }
  }, []);

  const iconsWithText: IconWithText[] = [
    {
      text: "Turn clicks into customers.",
    },
    {
      text: "Your power browser",
    },
    {
      text: "Supercharge leads and sales",
    },
    {
      text: "Elevate your email marketing",
    },
    {
      text: "Easily create professional videos",
    },
  ];

  const slides = _slides?.map(({ content, image, name }, index) => (
    <div key={index}>
      <div className="relative aspect-[640/415] w-full">
        {image && (
          <Image
            alt="service"
            className="object-cover object-center max-md:mb-1"
            fill
            src={image}
          />
        )}
      </div>
      <p className={clsx("type-lead-lg", "max-md:text-lg md:leading-10")}>
        <h3>{name}</h3>
        <PortableText value={content || []} />
      </p>
    </div>
  ));

  const handlePaginationClick = useCallback(
    (index: number) => {
      if (!sectionRef?.current) return;
      const newProgress = index / (slides.length - 1);
      const sectionTop = getSectionTop(sectionRef);
      if (sectionTop === null) return;
      const targetScrollTop =
        sectionTop +
        newProgress * (sectionRef.current.clientHeight - window.innerHeight);
      window.scrollTo({
        behavior: "smooth",
        top: targetScrollTop,
      });
    },
    [slides?.length]
  );

  const handleHeightChange = useCallback(
    (height: number) => {
      const calculatedHeight = height * slides?.length;
      if (calculatedHeight !== sectionHeight) {
        setSectionHeight(calculatedHeight);
      }
    },
    [sectionHeight, slides?.length]
  );

  const handleApi = useCallback((api: EmblaCarouselType) => {
    setEmblaApi(api);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !emblaApi) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const sectionTop = getSectionTop(sectionRef);
      if (sectionTop === null) return;
      const { height } = sectionRef.current!.getBoundingClientRect();
      const progressValue = calculateProgress(sectionTop, height);

      setProgress(progressValue);

      const newScrollDirection =
        currentScrollY > previousScrollY.current ? "down" : "up";
      previousScrollY.current = currentScrollY;
      setScrollDirection(newScrollDirection);

      const newIndex = Math.min(
        Math.floor(progressValue * slides.length),
        slides.length - 1
      );
      emblaApi.scrollTo(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slides.length, emblaApi]);

  return (
    <section className="w-full bg-brand min-h-screen" ref={sectionRef}>
      <div className="relative" style={{ height: `${sectionHeight}px` }}>
        <div className="sticky top-0 flex min-h-screen items-center justify-center">
          <div className={clsx("relative py-6", "md:p-8")}>
            <Slider
              onApiReady={handleApi}
              onHeightChange={handleHeightChange}
              onPaginationClick={handlePaginationClick}
              heading={heading}
              pagination
              scrollDirection={scrollDirection}
              sectionProgress={progress}
              slides={_slides}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderSection;
