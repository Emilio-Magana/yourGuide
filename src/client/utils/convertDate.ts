export const convertDate = (day: string) => {
  const dateObject: Date = new Date(day);
  const dateString = dateObject.toLocaleString("en-us", {
    // day: "numeric",
    month: "long",
    year: "numeric",
  });
  return dateString;
};
