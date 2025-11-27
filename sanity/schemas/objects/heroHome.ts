import { defineType } from "sanity";
import { FaImage as icon } from "react-icons/fa";
import { F } from "../tool";

export const heroHome = defineType(
  F.object({
    name: "heroHome",
    icon,

    fields: [
      F.string({
        name: "label",
      }),
      F.string({
        name: "heading",
      }),
      F.image({ name: "image", hotspot: true }),
      F.array({
        name: "cards",
        of: [
          F.object({
            name: "cardInfo",
            fields: [
              F.string({
                name: "name",
                validation: (Rule: any) => Rule.required(),
              }),
              F.image({ name: "image", hotspot: true }),
            ],
          }),
        ],
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
