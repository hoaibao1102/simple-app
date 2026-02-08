import { verifyAccessToken } from "../utils/jwt.js";

// middleware yêu cầu xác thực người dùng
export function requireAuth(req, res, next) {
  try {
    // Lấy token từ header Authorization
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // decode token để lấy thông tin user
    const decoded = verifyAccessToken(token);
    req.user = decoded; // { user_id, role, iat, exp }
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
