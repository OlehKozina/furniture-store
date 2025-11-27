import { defineType } from "sanity";
import { F } from "../tool";
import { UserIcon as icon } from "@sanity/icons";

export const cards = defineType(
  F.object({
    name: "cards",
    icon,

    fields: [
      F.text({ name: "heading" }),
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
              F.block({ name: "content" }),
            ],
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
        cardName: "cards.0.name",
        image: "cards.0.image",
      },
      prepare({
        heading,
        cardName,
        image,
      }: {
        heading?: string;
        cardName?: string;
        image?: any;
      }) {
        return {
          title: heading || cardName || "Cards section",
          subtitle: cardName
            ? `Includes ${cardName} and others`
            : "No cards yet",
          media: image,
        };
      },
    },
  })
);
