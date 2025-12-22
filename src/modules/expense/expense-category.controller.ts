import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import {
  createExpenseCategory,
  deleteExpenseCategory,
  getExpenseCategories,
  getExpenseCategoryById,
  updateExpenseCategory,
} from "./expense-category.service";

export const createExpenseCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const expenseCategory = await createExpenseCategory(req.body);
    res.status(201).json({
      success: true,
      message: "Expense category created successfully",
      data: expenseCategory,
    });
  }
);

export const getExpenseCategoriesController = catchAsync(
  async (req: Request, res: Response) => {
    const expenseCategories = await getExpenseCategories();
    res.status(200).json({
      success: true,
      message: "Expense categories fetched successfully",
      data: expenseCategories,
    });
  }
);

export const getExpenseCategoryByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const expenseCategory = await getExpenseCategoryById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Expense category fetched successfully",
      data: expenseCategory,
    });
  }
);

export const updateExpenseCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const expenseCategory = await updateExpenseCategory(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Expense category updated successfully",
      data: expenseCategory,
    });
  }
);

export const deleteExpenseCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    await deleteExpenseCategory(req.params.id);
    res.status(200).json({
      success: true,
      message: "Expense category deleted successfully",
    });
  }
);