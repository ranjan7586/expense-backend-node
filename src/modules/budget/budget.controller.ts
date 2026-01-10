import { Request, Response } from "express";
import budgetService from "./budget.service";
import { catchAsync } from "../../utils/catchAsync";
import { BudgetPeriod } from "./budget.model";

class BudgetController {
  createOrUpdateBudget = catchAsync(async (req: Request, res: Response) => {
    const budget = await budgetService.createOrUpdateBudget(
      req.body,
      req.user!.userId
    );
    res.status(201).json({
      success: true,
      message: "Budget created successfully",
      data: budget,
    });
  });

  getBudget = catchAsync(async (req: Request, res: Response) => {
    if (
      !["daily", "weekly", "monthly", "yearly"].includes(
        req.params.period as string
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid period",
        data: null,
      });
    }
    const budget = await budgetService.getBudget(
      req.params.period as BudgetPeriod,
      req.user!.userId
    );
    res.status(200).json({
      success: true,
      message: "Budget fetched successfully",
      data: budget,
    });
  });
}
export default new BudgetController();

//
