import { PortableTextBlock } from "next-sanity";

export type ItemType = {
  _id: string;
  _createdAt: Date;
  name: string;
  heading?: string;
  image: string;
  horizontalImage?: string;
  content: PortableTextBlock[];
  joinBakery?: any;
};
