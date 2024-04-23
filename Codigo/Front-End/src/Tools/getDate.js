export const getDate = () => {
  const timestamp = Date.now();
  const dateObject = new Date(timestamp);
  const offset = dateObject.getTimezoneOffset();
  const localTimestamp = timestamp - offset * 60 * 1000;
  const localDateTime = new Date(localTimestamp).toISOString();

  return localDateTime;
};
