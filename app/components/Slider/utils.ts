// components/Slider/utils.ts
import { useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

export const useCarouselControls = (
  emblaApi: EmblaCarouselType | undefined
) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Handle scroll snaps and selection
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Handle drag state
  useEffect(() => {
    if (!emblaApi) return;

    const handlePointerDown = () => setIsDragging(true);
    const handlePointerUp = () => setIsDragging(false);
    const handleSelect = () => setIsDragging(false);

    emblaApi.on("pointerDown", handlePointerDown);
    emblaApi.on("pointerUp", handlePointerUp);
    emblaApi.on("select", handleSelect);

    return () => {
      emblaApi.off("pointerDown", handlePointerDown);
      emblaApi.off("pointerUp", handlePointerUp);
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi]);

  // Navigation functions
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return {
    selectedIndex,
    scrollSnaps,
    isDragging,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
};
