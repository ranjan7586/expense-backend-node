/*import { z } from "zod";
import { ExpenseFor, ExpenseMode } from "../../types/expense";

export const createExpenseSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    amount: z.number({
      required_error: "Amount is required",
    }),
    date: z.string({
      required_error: "Date is required",
    }),
    expense_mode: z.enum([ExpenseMode.ONLINE, ExpenseMode.OFFLINE], {
      required_error: "Expense mode is required",
    }),
    expense_for: z.enum([ExpenseFor.PERSONAL, ExpenseFor.OTHERS], {
      required_error: "Expense for is required",
    }),
    category_id: z.string({
      required_error: "Category is required",
    }),
  }),
});

export const updateExpenseSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    amount: z.number().optional(),
    date: z.string().optional(),
    expense_mode: z.enum([ExpenseMode.ONLINE, ExpenseMode.OFFLINE]).optional(),
    expense_for: z.enum([ExpenseFor.PERSONAL, ExpenseFor.OTHERS]).optional(),
    category_id: z.string().optional(),
  }),
});*/

import { body } from "express-validator";

export const expenseValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),
  body("expense_mode")
    .notEmpty()
    .withMessage("Expense mode is required")
    .isIn(["online", "offline"])
    .withMessage("Invalid expense mode"),
  body("expense_for")
    .notEmpty()
    .withMessage("Expense for is required")
    .isIn(["personal", "others"])
    .withMessage("Invalid expense for"),
  body("category_id")
    .notEmpty()
    .withMessage("Category is required")
    .isString()
    .withMessage("Category must be a string"),
];
