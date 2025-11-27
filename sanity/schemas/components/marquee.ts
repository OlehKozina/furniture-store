import { defineType } from "sanity";
import { FaCheckCircle as icon } from "react-icons/fa";
import { F } from "../tool";

export const marquee = defineType(
  F.object({
    name: "marquee",
    icon,

    fields: [
      F.array({
        name: "logos",
        of: [F.image({ name: "logo" })],
      }),
    ],

    preview: {
      select: {
        heading: "heading",
        logos: "logos",
      },
      prepare({ heading, logos }: { heading?: string; logos?: string[] }) {
        const firstAdvantage =
          Array.isArray(logos) && logos.length ? logos[0] : undefined;

        return {
          title: heading || "Logos",
          media: firstAdvantage || icon,
        };
      },
    },
  })
);
