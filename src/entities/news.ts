export const formatDatetime = (datetime: string) => {
  const date = new Date(Date.parse(datetime));
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
};
