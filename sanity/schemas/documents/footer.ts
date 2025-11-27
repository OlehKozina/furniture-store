import { defineField } from "sanity";
import { FilterIcon as icon } from "@sanity/icons";
import { F } from "../tool";

export const footer = {
  name: "footer",
  type: "document",
  icon,
  fields: [
    F.array({
      name: "navigation",
      title: "Navigation Columns",
      of: [
        {
          type: "object",
          name: "navColumn",
          fields: [
            F.string({ name: "title", title: "Column Title" }),
            F.array({
              name: "links",
              title: "Links",
              of: [{ type: "link" }],
            }),
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }: { title?: any }) {
              return {
                title: title || "Navigation Column",
              };
            },
          },
        },
      ],
    }),
    F.string({ name: "phone" }),
    F.string({ name: "email" }),
    F.array({
      name: "socialLinks",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      email: "email",
      phone: "phone",
    },
    prepare({ email, phone }: { email?: string; phone?: string }) {
      return {
        title: "Footer",
        subtitle:
          email || phone ? `${email || ""} ${phone || ""}` : "No contact info",
      };
    },
  },
};
