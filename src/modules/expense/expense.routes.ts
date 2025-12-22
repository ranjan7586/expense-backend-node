import { Router } from "express";
import {
  createExpenseController,
  deleteExpenseController,
  getExpenseByIdController,
  getExpensesController,
  updateExpenseController,
} from "./expense.controller";
import { validate } from "../../middlewares/validate.middleware";
import {
  createExpenseSchema,
  updateExpenseSchema,
} from "./expense.validation";

const router = Router();

router
  .route("/")
  .get(getExpensesController)
  .post(validate(createExpenseSchema), createExpenseController);

router
  .route("/:id")
  .get(getExpenseByIdController)
  .patch(validate(updateExpenseSchema), updateExpenseController)
  .delete(deleteExpenseController);

export default router;