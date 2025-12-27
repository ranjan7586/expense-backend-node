import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import expenseCategoryService from "./expense-category.service";

class ExpenseCategoryController {
  createExpenseCategory = catchAsync(
    async (req: Request, res: Response) => {
      console.log(req.user)
      // req.body.createdBy = req.body.updatedBy = req.user!.userId;
      const expenseCategory = await expenseCategoryService.createExpenseCategory(req.body, req.user!.userId);
      res.status(201).json({
        success: true,
        message: "Expense category created successfully",
        data: expenseCategory,
      });
    }
  );

  getExpenseCategories = catchAsync(
    async (req: Request, res: Response) => {
      const expenseCategories = await expenseCategoryService.getExpenseCategories(req.user!.userId);
      res.status(200).json({
        success: true,
        message: "Expense categories fetched successfully",
        data: expenseCategories,
      });
    }
  );

  getExpenseCategoryById = catchAsync(
    async (req: Request, res: Response) => {
      const expenseCategory = await expenseCategoryService.getExpenseCategoryById(req.params.id);
      res.status(200).json({
        success: true,
        message: "Expense category fetched successfully",
        data: expenseCategory,
      });
    }
  );

  updateExpenseCategory = catchAsync(
    async (req: Request, res: Response) => {
      const expenseCategory = await expenseCategoryService.updateExpenseCategory(
        req.params.id,
        req.body
      );
      res.status(200).json({
        success: true,
        message: "Expense category updated successfully",
        data: expenseCategory,
      });
    }
  );

  deleteExpenseCategory = catchAsync(
    async (req: Request, res: Response) => {
      await expenseCategoryService.deleteExpenseCategory(req.params.id);
      res.status(200).json({
        success: true,
        message: "Expense category deleted successfully",
      });
    }
  );
}

export default new ExpenseCategoryController();