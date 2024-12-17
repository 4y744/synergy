export const getProfileAlt = (username: string) => {
  const arr = username.split(" ");
  return arr.length > 1
    ? (arr[0][0] + arr[1][0]).toUpperCase()
    : (arr[0][0] + arr[0][1]).toUpperCase();
};

export const getRandomProfileColor = () => {
  const rand = Math.random();
  return rand > 0.8
    ? "bg-cyan-700"
    : rand > 0.6
      ? "bg-yellow-700"
      : rand > 0.4
        ? "bg-green-700"
        : rand > 0.2
          ? "bg-red-700"
          : "bg-pink-700";
};
