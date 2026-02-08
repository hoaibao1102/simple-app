import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "./user.model.js";

// hàm lấy thông tin user hiện tại
export const getMe = asyncHandler(async (req, res) => {
  const userId = req.user.user_id;

  //lấy thông tin user từ database (bao gồm fullName, email, role, status)
  const user = await User.findById(userId).select("fullName email role status");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    status: user.status,
  });
});
