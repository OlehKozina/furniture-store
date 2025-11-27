import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from "embla-carousel";
import type { WheelGesturesPluginOptions } from "embla-carousel-wheel-gestures";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

export type CarouselConfigType = EmblaOptionsType & WheelGesturesPluginOptions;

export interface UseCarouselProps extends Partial<CarouselConfigType> {
  autoHeight?: boolean;
  fade?: boolean;
  wheelGesture?: boolean;
}

export type CanScrollType = {
  next: boolean;
  prev: boolean;
};

export type IndicesType = {
  active: ReturnType<EmblaCarouselType["selectedScrollSnap"]> | null;
  prev: ReturnType<EmblaCarouselType["previousScrollSnap"]> | null;
};

export const readSlideHeights = (emblaApi: EmblaCarouselType) => {
  const container = window.getComputedStyle(emblaApi.containerNode());
  return emblaApi.slideNodes().map((slideNode) => {
    const slideInner = slideNode.querySelector("*");
    if (!slideInner || !container) return "0px";
    const height = [
      window.getComputedStyle(slideInner).getPropertyValue("height"),
      container.getPropertyValue("padding-top"),
      container.getPropertyValue("padding-bottom"),
    ].reduce(
      (total, value) => parseInt(total.toString(), 10) + parseInt(value, 10),
      0
    );

    return `${height}px`;
  });
};

export const adaptContainerToSlide = (
  emblaApi: EmblaCarouselType,
  slideHeights: string[],
  setHeight: React.Dispatch<React.SetStateAction<string>>
) => {
  const currentSlideHeight = slideHeights[emblaApi.selectedScrollSnap()];
  setHeight(currentSlideHeight);
};

export const enabledAutoHeight = (
  emblaApi: EmblaCarouselType,
  setHeight: React.Dispatch<React.SetStateAction<string>>
) => {
  let slideHeights: string[] = [];

  const storeSlideHeights = () => {
    slideHeights = readSlideHeights(emblaApi);
  };
  const setContainerHeight = () =>
    adaptContainerToSlide(emblaApi, slideHeights, setHeight);

  emblaApi
    .on("init", storeSlideHeights)
    .on("init", setContainerHeight)
    .on("resize", storeSlideHeights)
    .on("resize", setContainerHeight)
    .on("select", setContainerHeight);
  storeSlideHeights();
  setContainerHeight();
};

const useCarousel = (
  args: UseCarouselProps = { loop: false, wheelGesture: true },
  plugins: EmblaPluginType[] = []
) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(args, [
    ...(args.wheelGesture ? [WheelGesturesPlugin()] : []),
    ...plugins,
  ]);
  const [height, setHeight] = useState("auto");
  const [canScroll, setCanScroll] = useState<CanScrollType | null>(null);
  const [sectionProgress, setSectionProgress] = useState<number>(0);
  const [indices, setIndices] = useState<IndicesType>({
    active: null,
    prev: null,
  });

  const updateIndices = useCallback(() => {
    if (emblaApi) {
      setIndices({
        active: emblaApi?.selectedScrollSnap(),
        prev: emblaApi?.previousScrollSnap(),
      });
    }
  }, [emblaApi?.selectedScrollSnap()]);

  const updateCanScroll = useCallback(() => {
    if (emblaApi) {
      setCanScroll({
        next: emblaApi?.canScrollNext(),
        prev: emblaApi?.canScrollPrev(),
      });
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      updateCanScroll();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      updateCanScroll();
    }
  }, [emblaApi]);
  const updateSectionProgress = useCallback(() => {
    if (emblaApi) {
      const progress = emblaApi.scrollProgress();
      setSectionProgress(progress);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      updateCanScroll();
      updateIndices();
      updateSectionProgress();
      emblaApi
        .on("init", updateCanScroll)
        .on("resize", updateCanScroll)
        .on("select", updateCanScroll)
        .on("init", updateIndices)
        .on("resize", updateIndices)
        .on("select", updateIndices)
        .on("select", updateSectionProgress)
        .on("scroll", updateSectionProgress);

      (Object.keys(args) as (keyof UseCarouselProps)[]).forEach((key) => {
        const value = args[key];

        if (!value) return;
        switch (key) {
          case "autoHeight":
            enabledAutoHeight(emblaApi, setHeight);
            break;
          case "fade":
            if (value) {
              emblaApi.internalEngine().translate.toggleActive(false);
            }
            break;
          default:
            break;
        }
      });
    }

    return () => {
      if (emblaApi) {
        emblaApi.destroy();
      }
    };
  }, [emblaApi]);

  return {
    api: emblaApi,
    canScroll,
    height,
    indices,
    ref: emblaRef,
    scrollNext,
    scrollPrev,
    sectionProgress,
    setHeight,
    updateSectionProgress,
  };
};

export default useCarousel;
export type { EmblaCarouselType, EmblaOptionsType, WheelGesturesPluginOptions };
