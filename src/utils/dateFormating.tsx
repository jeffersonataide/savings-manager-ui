import { format } from "date-fns";

export const formatDateStringToLong = (date: string) => {
  const dateObject = new Date(`${date}T00:00:00`);
  return format(dateObject, "dd MMM yyyy");
};
