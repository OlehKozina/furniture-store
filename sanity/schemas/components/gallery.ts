import { defineType, defineField } from "sanity";
import { FaImages as icon } from "react-icons/fa";
import { F } from "../tool";

export const gallery = defineType(
  F.object({
    name: "gallery",
    icon,
    fields: [
      F.string({
        name: "heading",
      }),
      F.array({
        name: "images",
        of: [
          F.image({
            name: "image",
            hotspot: true,
          }),
        ],
      }),
      F.reference({
        name: "navLink",
        to: [{ type: "navigation" }],
        title: "Navigation Link",
      }),
    ],

    preview: {
      select: {
        heading: "heading",
        image: "images.0.image",
      },
      prepare({ heading, image }: { heading?: string; image?: any }) {
        return {
          title: heading || "Gallery",
          media: image || icon,
        };
      },
    },
  })
);
