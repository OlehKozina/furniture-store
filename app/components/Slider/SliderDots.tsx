import React from "react";

interface SliderDotsProps {
  scrollSnaps: number[];
  selectedIndex: number;
  onDotClick: (index: number) => void;
}

const SliderDots = ({
  scrollSnaps,
  selectedIndex,
  onDotClick,
}: SliderDotsProps) => {
  return (
    <div className="flex mx-auto w-fit justify-center gap-2 mt-3 p-2 md:p-4 rounded-full bg-brand-teal">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 hover:scale-125 transition-all rounded-full ${
            index === selectedIndex ? "bg-brand-charcoal" : "bg-brand-tangerine"
          }`}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default SliderDots;
