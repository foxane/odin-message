export const shortenString = (str, len = 10) =>
  str.length <= len ? str : str.slice(0, len);
