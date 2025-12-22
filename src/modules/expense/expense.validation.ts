import { z } from "zod";
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
});