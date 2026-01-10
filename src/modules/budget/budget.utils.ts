import { BudgetPeriod } from "./budget.model";

export const getCurrentPeriodFilter = (period: BudgetPeriod) => {
  const now = new Date();
  const year = now.getFullYear();

  switch (period) {
    case "daily":
      return {
        year,
        day: now.getDate(),
      };

    case "weekly": {
      // ISO week number
      const start = new Date(now.getFullYear(), 0, 1);
      const diff = now.getTime() - start.getTime();
      const oneWeek = 1000 * 60 * 60 * 24 * 7;
      const week = Math.ceil(diff / oneWeek + 1);

      return {
        year,
        week,
      };
    }

    case "monthly":
      return {
        year,
        month: now.getMonth() + 1,
      };

    case "yearly":
      return {
        year,
      };

    default:
      throw new Error("Invalid budget period");
  }
};
