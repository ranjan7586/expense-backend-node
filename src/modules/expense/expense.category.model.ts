import mongoose, { Document, Schema, Types } from "mongoose";

export interface IExpenseCategory extends Document {
  name: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  deletedBy: Types.ObjectId;
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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExpenseCategory>(
  "ExpenseCategory",
  expenseCategorySchema
);
