import {
  faGithub,
  faFacebook,
  faLinkedin,
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
  github: { icon: faGithub, label: "Github" },
  facebook: { icon: faFacebook, label: "Facebook" },
  linkedin: { icon: faLinkedin, label: "LinkedIn" },
};

export const buildSocialLinks = (urls?: string[]) =>
  urls?.map((url) => {
    if (url.includes("linkedin")) return { href: url, ...platforms.linkedin };
    if (url.includes("facebook")) return { href: url, ...platforms.facebook };
    if (url.includes("github")) return { href: url, ...platforms.github };
    return { href: url, icon: null, label: "Unknown" };
  }) ?? [];
