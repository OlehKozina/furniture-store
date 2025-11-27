import React from "react";
import dynamic from "next/dynamic";

const componentMap: Record<string, React.ComponentType<any>> = {
  marquee: dynamic(() => import("../Marquee")),
  cards: dynamic(() => import("../Cards")),
  mediaWithText: dynamic(() => import("../MediaWithText")),
  slider: dynamic(() => import("../Slider")),
  mediaGridWithText: dynamic(() => import("../MediaGridWithText")),
  contact: dynamic(() => import("../Contact")),
  // sliderVertical: dynamic(() => import("../VerticalSlider")),
  gallery: dynamic(() => import("../Gallery")),
};

export default function ComponentsList({
  components = [],
}: {
  components?: any[];
}) {
  return (
    <>
      {components.map((block, index) => {
        const Component = componentMap[block._type];
        if (!Component) return null;
        return <Component key={block._key || index} {...block} />;
      })}
    </>
  );
}
