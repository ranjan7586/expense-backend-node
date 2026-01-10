import { Types } from "mongoose";
import { Budget, BudgetPeriod, IBudget } from "./budget.model";
import { getCurrentPeriodFilter } from "./budget.utils";

class BudgetService {
  createOrUpdateBudget = async (budget: Partial<IBudget>, userId: string) => {
    const userObjectId = new Types.ObjectId(userId);
    budget.createdAt !== undefined && delete budget.createdAt;
    budget.updatedAt !== undefined && delete budget.updatedAt;
    const filter: any = {
      user: userObjectId,
      period: budget.period,
      year: budget.year,
    };

    if (budget.day) filter.day = budget.day;
    if (budget.week) filter.week = budget.week;
    if (budget.month) filter.month = budget.month;

    const budget_db = await Budget.findOneAndUpdate(
      filter,
      { amount: budget.amount },
      { new: true, upsert: true }
    );
    return budget_db;
  };

  getBudget = async (period: BudgetPeriod, userId: string) => {
    const userObjectId = new Types.ObjectId(userId);
    const periodFilter = getCurrentPeriodFilter(period);

    const filter: any = {
      user: userObjectId,
      period: period,
      ...periodFilter,
    };
    const budget_db = await Budget.findOne(filter);
    return budget_db;
  };
}
export default new BudgetService();
