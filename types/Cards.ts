import { PortableTextBlock } from "next-sanity";

export type CardsType = {
  _key?: string;
  name?: string;
  image?: string;
  content?: PortableTextBlock[];
}[];
