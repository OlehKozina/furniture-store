"use client";
import Marquee from "react-fast-marquee";
import Image from "next/image";

function MarqueeWithText({ logos }: { logos?: { logo?: string }[] }) {
  if (!logos) return null;

  return (
    <section className="my-10 md:my-20">
      <Marquee
        gradient={false}
        speed={50}
        className="bg-brand-dark bg-opacity-80"
      >
        {!!logos?.length &&
          logos.map((item, i) => (
            <div key={i} className="flex items-center mr-8">
              <Image
                className="w-40 h-20"
                src={item?.logo || ""}
                width={40}
                height={20}
                alt="logo"
              />
            </div>
          ))}
      </Marquee>
    </section>
  );
}

export default MarqueeWithText;
