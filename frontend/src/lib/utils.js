export const shortenString = (str, len = 10) =>
  str.length <= len ? str : str.slice(0, len);

export const getTime = dateStr => {
  const date = new Date(dateStr);

  return date.getHours() + ':' + date.getMinutes();
};

export class Message {
  constructor(content, userId) {
    this.content = content;
    this.user = {
      id: userId,
    };
  }

  id = new Date().toTimeString();
  createdAt = new Date().toTimeString();
}
