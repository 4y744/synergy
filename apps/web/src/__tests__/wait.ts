export const wait = (time: number) => {
  return new Promise((resolve) => setTimeout(() => resolve(null), time));
};
