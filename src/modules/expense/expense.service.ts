import { Types } from "mongoose";
import { AppError } from "../../utils/AppError";
import Expense, { IExpense } from "./expense.model";
import { BudgetPeriod } from "../budget/budget.model";
import ExpenseCategory from "./expense.category.model";
import { getDateRangeForPeriod } from "./expense.utils";

class ExpenseService {
  createExpense = async (
    expense: Partial<IExpense & { category: string }>,
    userId: string
  ) => {
    const { category, date, ...rest } = expense;
    const category_main = await ExpenseCategory.findById(category);
    if (!category_main) {
      throw new AppError("Category not found", 404);
    }
    const newExpense = await Expense.create({
      ...rest,
      date: new Date(date!),
      category: category_main._id,
      createdBy: userId,
      updatedBy: userId,
    });
    return newExpense;
  };

  getExpenses = async (userId: string) => {
    const expenses = await Expense.find({
      createdBy: userId,
      deletedAt: null,
    }).populate("category", ["name", "type"]);
    return expenses;
  };

  getExpenseById = async (id: string) => {
    const expense = await Expense.findById(id);
    if (!expense) {
      throw new AppError("Expense not found", 404);
    }
    return expense;
  };

  updateExpense = async (
    id: string,
    expense: Partial<IExpense & { category: string }>,
    userId: string
  ) => {
    const { category, date, ...rest } = expense;
    let category_main;
    if (category) {
      category_main = await ExpenseCategory.findById(category);
      if (!category_main) {
        throw new AppError("Category not found", 404);
      }
    }
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        ...rest,
        ...(date && { date: new Date(date) }),
        ...(category_main && { category: category_main._id }),
        updatedBy: userId,
      },
      { new: true }
    );
    if (!updatedExpense) {
      throw new AppError("Expense not found", 404);
    }
    return updatedExpense;
  };

  deleteExpense = async (id: string, userId: string) => {
    const deletedExpense = await Expense.findByIdAndUpdate(id, {
      deletedAt: new Date(),
      deletedBy: userId,
    });
    if (!deletedExpense) {
      throw new AppError("Expense not found", 404);
    }
  };

  getTotalExpense = async (period: BudgetPeriod, userId: string) => {
    const userObjectId = new Types.ObjectId(userId);
    const { startDate, endDate } = getDateRangeForPeriod(period);
    console.log(userObjectId);
    const result = await Expense.aggregate([
      {
        $match: {
          createdBy: userObjectId,
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
          deletedAt: null,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    console.log(result)
    return result[0]?.total || 0;
  };
}
export default new ExpenseService();
