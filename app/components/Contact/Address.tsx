import React from "react";

const Address = ({
  city,
  address,
  phone,
}: {
  city?: string;
  address?: string;
  phone?: string;
}) => {
  return (
    <div className="flex gap-2 max-w-[14rem]" key={city}>
      <div className="flex flex-col gap-2">
        {city && <h4>{city}</h4>}
        {address && <p>{address}</p>}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="inline-block px-4 py-2 border border-white rounded-xl text-brand-charcoal font-medium hover:bg-white hover:text-black transition-colors duration-300"
          >
            {phone}
          </a>
        )}
      </div>
    </div>
  );
};

export default Address;
