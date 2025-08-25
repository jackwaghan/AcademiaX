import { Month } from "srm-academia-api";

const now = new Date();
const monthsShort = [
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
export const formattedMonth = `${monthsShort[now.getMonth()]} '${String(
  now.getFullYear()
).slice(-2)}`;
export const getIndex = ({ data }: { data: Month[] }) => {
  return data.findIndex((i) => i.month === formattedMonth);
};
