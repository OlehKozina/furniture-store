import React from "react";
import { PortableText, PortableTextBlock } from "@portabletext/react";

const BakerContent = ({
  name,
  content,
  className,
}: {
  content?: PortableTextBlock[];
  name?: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <h3 className="font-extrabold"> {name || ""}</h3>
      {content && (
        <div className="max-w-[12rem] mt-6 mb-6 text-sm font-thin last:mb-0 md:text-xl md:max-w-[21rem]">
          <PortableText value={content || []} />
        </div>
      )}
    </div>
  );
};

export default BakerContent;
