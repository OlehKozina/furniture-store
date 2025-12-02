import React from "react";
import Image from "next/image";
import { NavigationType } from "@/types";
import { buildContactLinks, buildSocialLinks } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navigation from "../Navigation";

const FooterContainer = ({
  footerContainer,
}: {
  footerContainer?: NavigationType;
}) => {
  if (!footerContainer) return null;
  const {
    address,
    email,
    navigation,
    phone,
    socialLinks: _socialLinks,
  } = footerContainer;

  const contactLinks = buildContactLinks(phone, email, address);
  const socialLinks = buildSocialLinks(_socialLinks);

  return (
    <div className="container z-content relative flex text-center flex-grow flex-col md:flex-row">
      <a
        href="#"
        className="mt-4 flex justify-center md:inline-block md:justify-start md:mt-0 z-[5]"
      >
        <Image
          src="/logo.png"
          alt="store_logo"
          width={100}
          height={100}
          className="relative z-5"
        />
      </a>
      <div className="flex z-9 mt-4 flex-grow justify-evenly flex-col md:flex-row text-center md:mt-0">
        {!!navigation?.length &&
          navigation.map((column) => (
            <Navigation
              key={column.title}
              title={column.title}
              links={column.links}
              classNames={{ root: "flex flex-col gap-5 items-start" }}
            />
          ))}

        <ul className="flex flex-col mt-4 gap-5 md:mt-0">
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
      </div>
    </div>
  );
};

export default FooterContainer;
