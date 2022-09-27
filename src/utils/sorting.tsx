import { TDeposit } from "services/api/deposits";

export const sortByDate = (a: TDeposit, b: TDeposit) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA.getTime() - dateB.getTime();
};
