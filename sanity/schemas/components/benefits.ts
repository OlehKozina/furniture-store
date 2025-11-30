import { defineType } from "sanity";
import { F } from "../tool";
import { ChartUpwardIcon as icon } from "@sanity/icons";

export const benefits = defineType(
  F.object({
    name: "benefits",
    icon,

    fields: [
      F.text({ name: "heading" }),
      F.string({
        name: "id",
      }),
      F.array({
        name: "benefits",
        of: [
          F.object({
            name: "benefit",
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
    ],

    preview: {
      select: {
        heading: "heading",
        benefitName: "benefits.0.name",
        image: "benefits.0.image",
      },
      prepare({
        heading,
        benefitName,
        image,
      }: {
        heading?: string;
        benefitName?: string;
        image?: any;
      }) {
        return {
          title: heading || benefitName || "Benefits section",
          subtitle: benefitName
            ? `Includes ${benefitName} and others`
            : "No benefits yet",
          media: image,
        };
      },
    },
  })
);
