import express from "express";
import userRoutes from "../modules/user/user.routes";
import expenseRoutes from "../modules/expense/expense.routes";
import expenseCategoryRoutes from "../modules/expense/expense-category.routes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/expenses", expenseRoutes);
router.use("/expense-categories", expenseCategoryRoutes);

export default router;
