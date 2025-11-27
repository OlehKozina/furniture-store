// Utility function to get the absolute position of the section
export const getSectionTop = (
  sectionRef: React.RefObject<HTMLDivElement>
): null | number => {
  if (!sectionRef?.current) return null
  const { top } = sectionRef.current.getBoundingClientRect()
  const scrollTop = window.scrollY
  return top + scrollTop
}

// Utility function to calculate the progress based on the scroll position
export const calculateProgress = (
  sectionTop: number,
  sectionHeight: number
): number => {
  const scrollTop = window.scrollY
  return Math.min(
    Math.max(
      (scrollTop - sectionTop) / (sectionHeight - window.innerHeight),
      0
    ),
    1
  )
}
