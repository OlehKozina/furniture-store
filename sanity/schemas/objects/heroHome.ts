import { defineType } from "sanity";
import { FaImage as icon } from "react-icons/fa";
import { F } from "../tool";

export const heroHome = defineType(
  F.object({
    name: "heroHome",
    icon,

    fields: [
      F.string({
        name: "heading",
      }),
      F.file({
        name: "video",
        accept: "video/*",
      }),
      F.array({
        name: "content",
        of: [{ type: "block" }],
      }),
    ],

    preview: {
      select: {
        heading: "heading",
        image: "image",
      },
      prepare({ heading, image }: { heading?: string; image?: any }) {
        return {
          title: heading || "Hero section",
          media: image || icon,
        };
      },
    },
  })
);
