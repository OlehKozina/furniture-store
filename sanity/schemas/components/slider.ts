import { defineType, defineField } from "sanity";
import { FaPhotoVideo as icon } from "react-icons/fa";
import { F } from "../tool";

export const slider = defineType(
  F.object({
    name: "slider",
    icon,
    fields: [
      F.string({
        name: "heading",
      }),
      F.string({
        name: "id",
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
                F.rating({ name: "rating", title: "Rating (1–5)" }),
                F.array({
                  name: "content",
                  of: [{ type: "block" }],
                }),
              ],
            })
          ),
        ],
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
          title: heading || "Slider",
          subtitle: firstSlide
            ? `Includes ${firstSlide} and more`
            : "No slides added yet",
          media: image || icon,
        };
      },
    },
  })
);
