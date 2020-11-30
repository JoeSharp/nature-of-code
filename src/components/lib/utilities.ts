export const pickRandomFromList = <T>(arr: T[], exclude: T[] = []): T => {
  const chooseFrom: T[] = arr.filter((a) => !exclude.includes(a));
  return chooseFrom[Math.floor(Math.random() * chooseFrom.length)];
};
