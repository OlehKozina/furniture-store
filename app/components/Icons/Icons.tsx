import Image from "next/image";

const iconPaths = {
  dogOne: "/icons/dog_icon_one.svg",
  dogTwo: "/icons/dog_icon_two.svg",
  dogBottom: "/icons/dog_icon_bottom.svg",
  dogIcon: "/icons/dog_icon.svg",
};

type IconPosition =
  | "top-left"
  | "top-right"
  | "center"
  | "bottom-left"
  | "bottom-right";

interface IconsProps {
  icons?: { name: keyof typeof iconPaths; position: IconPosition }[];
  className?: string;
}

export default function Icons({
  icons = [
    { name: "dogOne", position: "top-left" },
    { name: "dogTwo", position: "top-right" },
    { name: "dogIcon", position: "bottom-left" },
    { name: "dogBottom", position: "bottom-right" },
  ],
  className,
}: IconsProps) {
  const positionClasses: Record<IconPosition, string> = {
    "top-left": "top-0 sm:top-1/2 left-0",
    "top-right": "top-10 right-0",
    center: "top-1/2 left-1/2",
    "bottom-left": "bottom-10 left-0",
    "bottom-right": "bottom-10 right-0",
  };

  return (
    <div className="absolute z-under inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ name, position }, i) => (
        <Image
          key={i}
          src={iconPaths[name]}
          alt={name}
          width={80}
          height={80}
          className={`absolute rounded-full w-24 ${positionClasses[position]}`}
        />
      ))}
    </div>
  );
}
