/**
 * Try to copy a string to the clipboard of the device.
 * Might fail on some devices when using http instead of https.
 * @param str String to copy.
 * @param onError Optional error callback if task fails.
 */
export const copyToClipboard = (
  str: string,
  options?: {
    onError?: (error: string) => void;
  }
) => {
  try {
    navigator.clipboard.writeText(str);
  } catch (error) {
    options?.onError?.(error as string);
  }
};
