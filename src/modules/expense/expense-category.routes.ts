import { Router } from "express";
import {
  createExpenseCategoryController,
  deleteExpenseCategoryController,
  getExpenseCategoriesController,
  getExpenseCategoryByIdController,
  updateExpenseCategoryController,
} from "./expense-category.controller";
import { validate } from "../../middlewares/validate.middleware";
import {
  createExpenseCategorySchema,
  updateExpenseCategorySchema,
} from "./expense-category.validation";

const router = Router();

router
  .route("/")
  .get(getExpenseCategoriesController)
  .post(validate(createExpenseCategorySchema), createExpenseCategoryController);

router
  .route("/:id")
  .get(getExpenseCategoryByIdController)
  .patch(validate(updateExpenseCategorySchema), updateExpenseCategoryController)
  .delete(deleteExpenseCategoryController);

export default router;