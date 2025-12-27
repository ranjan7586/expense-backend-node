import { AppError } from "../../utils/AppError";
import Expense, { IExpense } from "./expense.model";
import ExpenseCategory from "./expense.category.model";

export const createExpense = async (
  expense: Partial<IExpense & { category_id: string }>,
  userId: string
) => {
  const { category_id, date, ...rest } = expense;
  const category = await ExpenseCategory.findById(category_id);
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  const newExpense = await Expense.create({
    ...rest,
    date: new Date(date!),
    category: category._id,
    createdBy: userId,
    updatedBy: userId,
  });
  return newExpense;
};

export const getExpenses = async (userId: string) => {
  const expenses = await Expense.find({ createdBy: userId, deletedAt: null });
  return expenses;
};

export const getExpenseById = async (id: string) => {
  const expense = await Expense.findById(id);
  if (!expense) {
    throw new AppError("Expense not found", 404);
  }
  return expense;
};

export const updateExpense = async (
  id: string,
  expense: Partial<IExpense & { category_id: string }>,
  userId: string
) => {
  const { category_id, date, ...rest } = expense;
  let category;
  if (category_id) {
    category = await ExpenseCategory.findById(category_id);
    if (!category) {
      throw new AppError("Category not found", 404);
    }
  }
  const updatedExpense = await Expense.findByIdAndUpdate(
    id,
    {
      ...rest,
      ...(date && { date: new Date(date) }),
      ...(category && { category: category._id }),
      updatedBy: userId,
    },
    { new: true }
  );
  if (!updatedExpense) {
    throw new AppError("Expense not found", 404);
  }
  return updatedExpense;
};

export const deleteExpense = async (id: string, userId: string) => {
  const deletedExpense = await Expense.findByIdAndUpdate(id, {
    deletedAt: new Date(),
    deletedBy: userId,
  });
  if (!deletedExpense) {
    throw new AppError("Expense not found", 404);
  }
};
