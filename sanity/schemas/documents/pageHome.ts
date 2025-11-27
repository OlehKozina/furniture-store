import { AiOutlineHome as icon } from "react-icons/ai";
import { F, G } from "../tool";

export const pageHome = {
  icon,
  name: "pageHome",
  title: "Home Page",
  type: "document",
  groups: [
    G.define("content", { title: "Content" }),
    G.define("seo", { title: "SEO" }),
  ],
  fields: [
    ...G.group("content", [
      F.array({
        name: "hero",
        of: [F.field("heroHome")],
      }),
      F.array({
        name: "components",
        title: "Page Components",
        of: [
          { type: "marquee" },
          { type: "cards" },
          { type: "mediaWithText" },
          { type: "slider" },
          { type: "mediaGridWithText" },
          { type: "contact" },
          { type: "sliderVertical" },
          { type: "gallery" },
        ],
      }),
    ]),
    ...G.group("seo", [
      F.string({ name: "seoTitle" }),
      F.string({ name: "seoKeywords" }),
      F.slug?.({ name: "seoSlug" }),
      F.image({ name: "seoImage" }),
    ]),
  ],
  preview: {
    select: {
      title: "seoTitle",
    },
    prepare({ title }: { title?: string }) {
      return {
        title: title || "Home Page",
      };
    },
  },
};
