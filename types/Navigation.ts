import { PortableTextBlock } from "next-sanity";
import { FormType } from "./ContactType";

export type NavigationType = {
  navigation?: {
    title?: string;
  }[];
  privacyPolicy?: PortableTextBlock;
  form?: FormType;
  phone?: string;
  address?: {
    name?: string;
    link?: string;
  };
  socialLinks?: string[];
  email?: string;
  footerImages?: {
    left?: string;
    right?: string;
  };
};
