export const getHeadingParts = (heading: string) => {
  const words = heading.split(" ");
  return {
    firstWord: words[0],
    lastWord: words[words.length - 1],
    fullText: heading.split(""),
  };
};

export const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.03 },
  },
};

export const charVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
};
