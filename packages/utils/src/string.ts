export const abbreviate = (username: string) => {
  const arr = username.split(" ");
  return (arr[0][0] + (arr.length > 1 ? arr[1][0] : arr[0][1])).toUpperCase();
};
