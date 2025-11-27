import {
  faInstagram,
  faFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const buildContactLinks = (
  phone?: string,
  email?: string,
  address?: { link?: string; name?: string }
) =>
  [
    phone ? { href: `tel:${phone}`, label: phone } : null,
    email ? { href: `mailto:${email}`, label: email } : null,
    address?.link && address?.name
      ? { href: address.link, label: address.name, external: true }
      : null,
  ].filter(Boolean);

const platforms = {
  instagram: { icon: faInstagram, label: "Instagram" },
  facebook: { icon: faFacebook, label: "Facebook" },
  twitter: { icon: faXTwitter, label: "Twitter" },
};

export const buildSocialLinks = (urls?: string[]) =>
  urls?.map((url) => {
    if (url.includes("instagram")) return { href: url, ...platforms.instagram };
    if (url.includes("facebook")) return { href: url, ...platforms.facebook };
    if (url.includes("x") || url.includes("twitter"))
      return { href: url, ...platforms.twitter };
    return { href: url, icon: null, label: "Unknown" };
  }) ?? [];
