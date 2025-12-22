import { z } from "zod";

export const createExpenseCategorySchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    type: z.string({
      required_error: "Type is required",
    }),
  }),
});

export const updateExpenseCategorySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    type: z.string().optional(),
  }),
});