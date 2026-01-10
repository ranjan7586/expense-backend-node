import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import budgetController from "./budget.controller";
import { validate } from "../../middlewares/validate.middleware";
import { budgetValidation } from "./budget.validation";

const router = Router();
router.use(authMiddleware);

router.post(
  "/createorupdate",
  validate(budgetValidation),
  budgetController.createOrUpdateBudget
);
router.get("/get-budget/:period", budgetController.getBudget);
export default router;
