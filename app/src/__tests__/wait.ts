export const wait = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(null), time));
