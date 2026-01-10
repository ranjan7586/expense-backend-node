import { body } from "express-validator";

export const budgetValidation = [
  body("period")
    .notEmpty()
    .withMessage("Budget period is required")
    .isIn(["daily", "weekly", "monthly", "yearly"])
    .withMessage("Invalid budget period"),
  body("year")
    .notEmpty()
    .withMessage("Year is required")
    .isInt({ min: 2000 })
    .withMessage("Invalid year"),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Invalid amount")
    .isFloat({ min: 0 })
    .withMessage("Invalid amount"),

  body("day")
    .if(body("period").equals("daily"))
    .notEmpty()
    .isInt({ min: 1, max: 31 })
    .withMessage("Day is required for daily budget"),
  body("day")
    .if(body("period").not().equals("daily"))
    .custom((value) => {
      if (value !== undefined)
        throw new Error("Day is only allowed for daily budget");
      return true;
    }),

  body("week")
    .if(body("period").equals("weekly"))
    .notEmpty()
    .isInt({ min: 1, max: 52 })
    .withMessage("Week is required for weekly budget"),
  body("week")
    .if(body("period").not().equals("weekly"))
    .custom((value) => {
      if (value !== undefined)
        throw new Error("Week is only allowed for weekly budget");
      return true;
    }),

  body("month")
    .if(body("period").equals("monthly"))
    .notEmpty()
    .isInt({ min: 1, max: 12 })
    .withMessage("Month is required for monthly budget"),
  body("month")
    .if(body("period").not().equals("monthly"))
    .custom((value) => {
      if (value !== undefined)
        throw new Error("Month is only allowed for monthly budget");
      return true;
    }),
];