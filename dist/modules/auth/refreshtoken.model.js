import mongoose from "mongoose";
const refreshTokenSchema = mongoose.Schema({
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
}, {
    timestamps: true,
});
export default mongoose.model("RefreshToken", refreshTokenSchema);
