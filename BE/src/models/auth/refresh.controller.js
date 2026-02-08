import { asyncHandler } from "../../utils/asyncHandler.js";
import { verifyRefreshToken, signAccessToken } from "../../utils/jwt.js";
import { User } from "../users/user.model.js";

// hàm làm mới access token sử dụng refresh token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.user_id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.status !== "ACTIVE") {
      return res.status(403).json({ message: "Account is not active" });
    }

    // tạo access token mới
    const newAccessToken = signAccessToken({
      user_id: user._id.toString(),
      role: user.role,
    });

    return res.json({
      access_token: newAccessToken,
      user: {
        id: user._id.toString(),
        role: user.role,
      },
    });
  } catch {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
});
