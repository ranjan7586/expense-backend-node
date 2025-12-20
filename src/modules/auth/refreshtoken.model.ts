import mongoose, { Schema } from "mongoose";

export interface IRefreshToken extends mongoose.Document {
  _id: string;
  user: string;
  token: string;
  expiresAt: Date;
  deletedAt: Date | null;
}

const refreshTokenSchema: Schema = new mongoose.Schema<IRefreshToken>(
  {
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("RefreshToken", refreshTokenSchema);
