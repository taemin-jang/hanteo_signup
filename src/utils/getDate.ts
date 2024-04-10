const getDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = date.getHours();
  const minute = date.getMinutes();
  const dateStr = `${year}-${month}-${day} ${hour}:${minute}`;
  return dateStr;
};

export default getDate;
