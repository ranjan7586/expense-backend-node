import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "./expense.service";

export const createExpenseController = catchAsync(
  async (req: Request, res: Response) => {
    const expense = await createExpense(req.body, req.user!.userId);
    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  }
);

export const getExpensesController = catchAsync(
  async (req: Request, res: Response) => {
    const expenses = await getExpenses(req.user!.userId);
    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expenses,
    });
  }
);

export const getExpenseByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const expense = await getExpenseById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Expense fetched successfully",
      data: expense,
    });
  }
);

export const updateExpenseController = catchAsync(
  async (req: Request, res: Response) => {
    const expense = await updateExpense(req.params.id, req.body, req.user!.userId);
    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  }
);

export const deleteExpenseController = catchAsync(
  async (req: Request, res: Response) => {
    await deleteExpense(req.params.id, req.user!.userId);
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  }
);
