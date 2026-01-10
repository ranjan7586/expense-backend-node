import { Request, Response } from "express";
import expenseService from "./expense.service";
import { catchAsync } from "../../utils/catchAsync";
import { BudgetPeriod } from "../budget/budget.model";

export const createExpenseController = catchAsync(
  async (req: Request, res: Response) => {
    const expense = await expenseService.createExpense(
      req.body,
      req.user!.userId
    );
    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  }
);

export const getExpensesController = catchAsync(
  async (req: Request, res: Response) => {
    const expenses = await expenseService.getExpenses(req.user!.userId);
    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expenses,
    });
  }
);

export const getExpenseByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const expense = await expenseService.getExpenseById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Expense fetched successfully",
      data: expense,
    });
  }
);

export const updateExpenseController = catchAsync(
  async (req: Request, res: Response) => {
    const expense = await expenseService.updateExpense(
      req.params.id,
      req.body,
      req.user!.userId
    );
    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  }
);

export const deleteExpenseController = catchAsync(
  async (req: Request, res: Response) => {
    await expenseService.deleteExpense(req.params.id, req.user!.userId);
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  }
);

export const getTotalExpense = catchAsync(
  async (req: Request, res: Response) => {
    const totalExpense = await expenseService.getTotalExpense(
      req.params.period as BudgetPeriod,
      req.user!.userId
    );
    res.status(200).json({
      success: true,
      message: "Total expense fetched successfully",
      data: totalExpense,
    });
  }
);
