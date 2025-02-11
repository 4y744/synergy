/**
 * Performs standard abbreviation on a string.
 * @param str String to abbreviate.
 * @returns abbreviated string
 */
export const abbreviate = (str: string) => {
  const arr = str.split(" ");
  return (arr[0][0] + (arr.length > 1 ? arr[1][0] : arr[0][1])).toUpperCase();
};

/**
 * Checks whether a string is a valid url.
 * @param url string to validate.
 */
export const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
