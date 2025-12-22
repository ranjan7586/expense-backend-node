import bcrypt from "bcryptjs";
import { StringValue } from "ms";
import { v4 as uuidv4 } from "uuid";
import { Role } from "../../types/roles";
import mongoose, { Schema, Document } from "mongoose";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export interface IUser extends Document {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  createdBy: string;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string;
  comparePassword: (password: string, hash: string) => boolean;
  jwtToken: (user_id: string) => string;
}

const userSchema: Schema = new mongoose.Schema<IUser>(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    createdBy: {
      type: String,
      default: null,
    },
    updatedBy: {
      type: String,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deletedBy: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

userSchema.index({ email: 1 }, { unique: true });

userSchema.methods.comparePassword = function (
  password: string,
  hash: string
): boolean {
  return bcrypt.compareSync(password, hash);
};
userSchema.methods.jwtToken = function (user_id: string): string {
  const secret: Secret = process.env.SECRET_KEY as Secret;
  const options: SignOptions = {
    expiresIn: process.env.EXPIRES_IN as StringValue,
  };
  return jwt.sign({ user_id }, secret, options);
};

export default mongoose.model<IUser>("User", userSchema);
