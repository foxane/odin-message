export const shortenString = (str, len = 10) =>
  str.length <= len ? str : str.slice(0, len);

export const getTime = dateStr => {
  const date = new Date(dateStr);

  return date.getHours() + ':' + date.getMinutes();
};
