import { BudgetPeriod } from "../budget/budget.model";

export const getDateRangeForPeriod = (period: BudgetPeriod) => {
  const now = new Date();

  let startDate: Date;
  let endDate: Date;

  switch (period) {
    case "daily": {
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
      );
      endDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
      );
      break;
    }

    case "weekly": {
      const day = now.getDay(); // 0 (Sun) - 6 (Sat)
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday
      startDate = new Date(now.setDate(diff));
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;
    }

    case "monthly": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      break;
    }

    case "yearly": {
      startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
      endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      break;
    }

    default:
      throw new Error("Invalid period");
  }

  return { startDate, endDate };
};
