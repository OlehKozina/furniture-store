import { DocumentIcon } from "@sanity/icons";
import { F } from "../tool";

export const privacyPolicy = {
  name: "privacyPolicy",
  type: "document",
  icon: DocumentIcon,
  fields: [
    F.array({
      name: "content",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      content: "content",
    },
    prepare({ content }: { content?: any[] }) {
      const firstTextBlock = content?.find((block) => block._type === "block");
      const previewText = firstTextBlock
        ? firstTextBlock.children?.map((child: any) => child.text).join(" ")
        : null;
      return {
        title: "Privacy Policy",
        subtitle: previewText
          ? previewText.slice(0, 50) + "…"
          : "No content yet",
      };
    },
  },
};
