import { defineType, defineField } from "sanity";
import { FaSlideshare as icon } from "react-icons/fa";
import { F } from "../tool";

export const sliderVertical = defineType(
  F.object({
    name: "sliderVertical",
    icon,
    fields: [
      F.string({
        name: "heading",
      }),
      F.array({
        name: "slides",
        of: [
          defineField(
            F.object({
              name: "slide",
              fields: [
                F.string({
                  name: "name",
                }),
                F.image({
                  name: "image",
                  hotspot: true,
                }),
                F.array({
                  name: "content",
                  of: [{ type: "block" }],
                }),
              ],
            })
          ),
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
        firstSlide: "slides.0.name",
        image: "slides.0.image",
      },
      prepare({
        heading,
        firstSlide,
        image,
      }: {
        heading?: string;
        firstSlide?: string;
        image?: any;
      }) {
        return {
          title: heading || "Horizontal Slider",
          subtitle: firstSlide
            ? `Includes ${firstSlide} and more`
            : "No slides added yet",
          media: image || icon,
        };
      },
    },
  })
);
