import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const userSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
});
userSchema.index({ email: 1 }, { unique: true });
userSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash);
};
userSchema.methods.jwtToken = function (user_id) {
    return jwt.sign({ user_id }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRES_IN,
    });
};
export default mongoose.model("User", userSchema);
