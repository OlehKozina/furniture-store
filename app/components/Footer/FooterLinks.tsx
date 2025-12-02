import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FooterLinksProps {
  contactLinks: Array<{
    href: string;
    label?: string;
    external?: boolean;
  } | null>;
  socialLinks: Array<{
    href: string;
    label: string;
    icon?: any;
  } | null>;
}

const ContactAndSocialLinks: React.FC<FooterLinksProps> = ({
  contactLinks,
  socialLinks,
}) => {
  return (
    <ul className="flex flex-col mt-4 gap-5 md:mt-0">
      {!!contactLinks?.length &&
        contactLinks.map(
          (link) =>
            link?.label && (
              <li key={link?.href} className="flex justify-center md:block">
                <a
                  href={link?.href}
                  target={link?.external ? "_blank" : undefined}
                  rel={link?.external ? "noopener noreferrer" : undefined}
                  className="font-thin hover:text-brand-default transition-colors flex flex-col md:flex-row"
                >
                  {link.label}
                </a>
              </li>
            )
        )}
      <li>
        <div className="flex space-x-4 justify-center md:justify-start">
          {!!socialLinks.length &&
            socialLinks.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                aria-label={link?.label}
                className="hover:text-brand-default transition-colors flex items-center"
              >
                {link?.icon && (
                  <FontAwesomeIcon icon={link.icon} className="text-2xl" />
                )}
              </a>
            ))}
        </div>
      </li>
    </ul>
  );
};

export default ContactAndSocialLinks;
