import { Router } from "express";
import {
  createExpenseController,
  deleteExpenseController,
  getExpenseByIdController,
  getExpensesController,
  updateExpenseController,
} from "./expense.controller";
import { validate } from "../../middlewares/validate.middleware";
import { expenseValidation } from "./expense.validation";

const router = Router();

router.get("/", getExpensesController);
router.post("/create", expenseValidation, createExpenseController);

// router
//   .route("/:id")
//   .get(getExpenseByIdController)
//   .patch(validate(updateExpenseSchema), updateExpenseController)
//   .delete(deleteExpenseController);

export default router;
