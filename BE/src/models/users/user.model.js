import mongoose from "mongoose";

// Định nghĩa schema và model cho người dùng
// Bao gồm các trường: fullName, email, passwordHash, role, status
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
//Lưu ý quan trọng: select: false nghĩa là query bình thường sẽ không lấy passwordHash (an toàn).
// Muốn lấy thì phải dùng .select('+passwordHash') trong query
