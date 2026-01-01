import { Router } from "express";
// import { validate } from "../../middlewares/validate.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { expenseCategoryValidation } from "./expense-category.validation";
import expenseCategoryController from "./expense-category.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/", expenseCategoryController.getExpenseCategories);
router.post(
  "/create",
  validate(expenseCategoryValidation),
  expenseCategoryController.createExpenseCategory
);

router.patch("/update/:id", expenseCategoryController.updateExpenseCategory);
router.delete("/delete/:id", expenseCategoryController.deleteExpenseCategory);

// router
//   .route("/:id")
//   .get(getExpenseCategoryByIdController)
//   .patch(validate(updateExpenseCategorySchema), updateExpenseCategoryController)
//   .delete(deleteExpenseCategoryController);

export default router;
