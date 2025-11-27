import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterPrivacy from "./FooterPrivacy";
import { NavigationType } from "@/types";
import Navigation from "../Navigation";
import { buildContactLinks, buildSocialLinks } from "./utils";

const FooterNavigation = ({
  footerNavigation,
}: {
  footerNavigation?: NavigationType;
}) => {
  if (!footerNavigation) return null;
  const {
    address,
    email,
    navigation,
    phone,
    privacyPolicy,
    socialLinks: _socialLinks,
  } = footerNavigation;

  const contactLinks = buildContactLinks(phone, email, address);
  const socialLinks = buildSocialLinks(_socialLinks);

  return (
    <div className="flex z-9 mt-4 flex-grow justify-evenly flex-col md:flex-row text-center md:mt-0">
      <Navigation navigation={navigation} />
      <ul className="flex flex-col justify-center text-center mt-4 md:mt-0">
        {contactLinks.map(
          (link) =>
            link?.label && (
              <li key={link.href} className="flex justify-center md:block">
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="font-thin hover:text-brand-default transition-colors flex flex-col md:flex-row"
                >
                  {link.label}
                </a>
              </li>
            )
        )}
        <li>
          <div className="flex space-x-4 justify-center md:justify-start">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="hover:text-brand-default transition-colors flex items-center"
              >
                {link.icon && (
                  <FontAwesomeIcon icon={link.icon} className="text-2xl" />
                )}
              </a>
            ))}
          </div>
        </li>
      </ul>
      <FooterPrivacy privacyPolicy={privacyPolicy} />
    </div>
  );
};

export default FooterNavigation;
