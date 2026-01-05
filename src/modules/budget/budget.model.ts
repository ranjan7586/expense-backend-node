import mongoose, { Document, Schema, Types } from "mongoose";
export type BudgetPeriod = "daily" | "weekly" | "monthly" | "yearly";
export interface IBudget extends Document {
  user: Types.ObjectId;
  period: BudgetPeriod;
  year: number;
  day?: number;
  week?: number;
  month?: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

const budgetSchema: Schema = new Schema<IBudget>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    period: {
      type: String,
      required: true,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    year: { type: Number, required: true },
    day: { type: Number, required: false, min: 1, max: 31 },
    week: { type: Number, required: false, min: 1, max: 52 },
    month: { type: Number, required: false, min: 1, max: 12 },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

budgetSchema.index(
  { user: 1, period: 1, year: 1, month: 1, week: 1, day: 1 },
  { unique: true }
);

export const Budget = mongoose.model<IBudget>("Budget", budgetSchema);
