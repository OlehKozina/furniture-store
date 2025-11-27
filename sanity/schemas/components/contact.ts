import { defineType } from "sanity";
import { MarkerIcon as icon } from "@sanity/icons";
import { F } from "../tool";

export const contact = defineType(
  F.object({
    name: "contact",
    title: "Contact",
    icon,
    fields: [
      F.string({
        name: "heading",
      }),
      F.array({
        name: "content",
        of: [{ type: "block" }],
      }),
      F.array({
        name: "addresses",
        of: [
          F.object({
            name: "item",
            fields: [
              F.string({
                name: "city",
              }),
              F.string({
                name: "address",
              }),
              F.string({ name: "phone" }),
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
      },
      prepare({ heading }: { heading?: string }) {
        return {
          title: heading || "Join the Bakery section",
        };
      },
    },
  })
);
