import { Router } from "express";
import {
  createExpenseController,
  deleteExpenseController,
  getExpenseByIdController,
  getExpensesController,
  getTotalExpense,
  updateExpenseController,
} from "./expense.controller";
import { validate } from "../../middlewares/validate.middleware";
import { expenseValidation } from "./expense.validation";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/", getExpensesController);
router.post("/create", validate(expenseValidation), createExpenseController);
router.get("/get-total-expense/:period", getTotalExpense);

// router
//   .route("/:id")
//   .get(getExpenseByIdController)
//   .patch(validate(updateExpenseSchema), updateExpenseController)
//   .delete(deleteExpenseController);

export default router;
