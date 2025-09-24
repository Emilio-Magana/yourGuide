// export const convertDate = (date: string, day: number) =>
//   new Date(date).toLocaleString("en-us", {
//     day: day ? "numeric" : undefined,
//     month: "long",
//     year: "numeric",
//   });

export const convertDate = (date: Date) => {
  const dateString = date.toLocaleString("en-us", {
    month: "long",
    year: "numeric",
  });
  return dateString;
};
// date = tour.startDates[0].toLocaleString('en-us', {month: 'long', year: 'numeric'})
