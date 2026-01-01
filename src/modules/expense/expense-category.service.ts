import { Types } from "mongoose";
import { AppError } from "../../utils/AppError";
import userModel from "../user/user.model";
import ExpenseCategory, { IExpenseCategory } from "./expense.category.model";

class ExpenseCategoryService {
  createExpenseCategory = async (
    expenseCategory: Partial<IExpenseCategory>,
    userId: string
  ) => {
    const userObjectId = new Types.ObjectId(userId);
    expenseCategory.createdBy = userObjectId;
    expenseCategory.updatedBy = userObjectId;
    const newExpenseCategory = await ExpenseCategory.create(expenseCategory);
    return newExpenseCategory;
  };

  getExpenseCategories = async (userId: string) => {
    const expenseCategories = await ExpenseCategory.find({
      deletedAt: null,
      createdBy: userId,
    }).populate("createdBy", ["firstname", "lastname", "email", "role"]);
    return expenseCategories;
  };

  getExpenseCategoryById = async (id: string) => {
    const expenseCategory = await ExpenseCategory.findById(id);
    if (!expenseCategory) {
      throw new AppError("Expense category not found", 404);
    }
    return expenseCategory;
  };

  updateExpenseCategory = async (
    id: string,
    expenseCategory: Partial<IExpenseCategory>
  ) => {
    const { name, type } = expenseCategory;
    const updatedExpenseCategory = await ExpenseCategory.findByIdAndUpdate(
      id,
      { name, type },
      { new: true }
    );
    if (!updatedExpenseCategory) {
      throw new AppError("Expense category not found", 404);
    }
    return updatedExpenseCategory;
  };

  deleteExpenseCategory = async (id: string) => {
    const deletedExpenseCategory = await ExpenseCategory.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    if (!deletedExpenseCategory) {
      throw new AppError("Expense category not found", 404);
    }
  };
}

export default new ExpenseCategoryService();
