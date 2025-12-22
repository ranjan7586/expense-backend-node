import mongoose, { Document, Schema } from "mongoose";

export interface IExpenseCategory extends Document {
  name: string;
  type: string;
}

const expenseCategorySchema: Schema = new Schema<IExpenseCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExpenseCategory>(
  "ExpenseCategory",
  expenseCategorySchema
);
