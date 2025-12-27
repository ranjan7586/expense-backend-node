import mongoose, { Document, Schema } from "mongoose";
import { IExpenseCategory } from "./expense.category.model";
import { ExpenseFor, ExpenseMode } from "../../types/expense";

export interface IExpense extends Document {
  title: string;
  amount: number;
  expense_mode: ExpenseMode;
  expense_for: ExpenseFor;
  category: IExpenseCategory;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: Schema.Types.ObjectId;
  updatedBy: Schema.Types.ObjectId;
  deletedBy: Schema.Types.ObjectId;
}

const expenseSchema: Schema = new Schema<IExpense>(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    expense_mode: {
      type: String,
      enum: Object.values(ExpenseMode),
      required: true,
    },
    expense_for: {
      type: String,
      enum: Object.values(ExpenseFor),
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "ExpenseCategory",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model<IExpense>("Expense", expenseSchema);