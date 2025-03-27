// Get the current month in the format: "Jan '25"
export function getCurrentMonth() {
  const now = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = now.getFullYear().toString().slice(-2); // Get last two digits of the year
  return `${monthNames[now.getMonth()]} '${year}`;
}
