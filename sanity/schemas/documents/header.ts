import { FaBars as icon } from "react-icons/fa";
import { F } from "../tool";
import { PortableTextBlock } from "next-sanity";

export const header = {
  name: "header",
  type: "document",
  title: "Header",
  icon,

  fields: [
    F.array({
      name: "navigation",
      of: [{ type: "link" }],
      title: "Navigation Links",
    }),
    F.reference({
      name: "privacyPolicy",
      to: [{ type: "privacyPolicy" }],
    }),
  ],

  preview: {
    select: {
      navigation: "navigation",
      privacyPolicy: "privacyPolicy",
    },
    prepare({
      navigation,
      privacyPolicy,
    }: {
      navigation?: any[];
      privacyPolicy?: PortableTextBlock;
    }) {
      const navCount = Array.isArray(navigation) ? navigation.length : 0;
      return {
        title: "Header",
        subtitle: `Links: ${navCount}${privacyPolicy ? ", includes Privacy Policy" : ""}`,
        media: icon,
      };
    },
  },
};
