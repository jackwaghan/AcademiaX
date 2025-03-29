export const calculateRequired = (
  conducted: number,
  absent: number,
  requiredPercentage: number = 75
) => {
  const present = conducted - absent;
  const requiredClasses = Math.max(
    Math.ceil(
      ((requiredPercentage / 100) * conducted - present) /
        (1 - requiredPercentage / 100)
    ),
    0
  );
  return requiredClasses;
};
