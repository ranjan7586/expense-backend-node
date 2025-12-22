import AppError from "../../utils/AppError";
import ExpenseCategory, { IExpenseCategory } from "./expense.category.model";

export const createExpenseCategory = async (
  expenseCategory: Partial<IExpenseCategory>
) => {
  const newExpenseCategory = await ExpenseCategory.create(expenseCategory);
  return newExpenseCategory;
};

export const getExpenseCategories = async () => {
  const expenseCategories = await ExpenseCategory.find();
  return expenseCategories;
};

export const getExpenseCategoryById = async (id: string) => {
  const expenseCategory = await ExpenseCategory.findById(id);
  if (!expenseCategory) {
    throw new AppError("Expense category not found", 404);
  }
  return expenseCategory;
};

export const updateExpenseCategory = async (
  id: string,
  expenseCategory: Partial<IExpenseCategory>
) => {
  const updatedExpenseCategory = await ExpenseCategory.findByIdAndUpdate(
    id,
    expenseCategory,
    { new: true }
  );
  if (!updatedExpenseCategory) {
    throw new AppError("Expense category not found", 404);
  }
  return updatedExpenseCategory;
};

export const deleteExpenseCategory = async (id: string) => {
  const deletedExpenseCategory = await ExpenseCategory.findByIdAndDelete(id);
  if (!deletedExpenseCategory) {
    throw new AppError("Expense category not found", 404);
  }
};