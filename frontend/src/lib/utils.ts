export const getTime = (str: string): string => {
  if (!str) return 'undefiled';
  const date = new Date(str);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatDate = (
  date: string,
  options?: Intl.DateTimeFormatOptions,
): string =>
  new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
