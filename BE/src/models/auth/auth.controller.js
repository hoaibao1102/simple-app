import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../users/user.model.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.js";

// hàm đăng ký
export const register = asyncHandler(async (req, res) => {
  // hàm spread operator (...) để lấy fullName, email, password từ req.body
  const { fullName, email, password } = req.body;

  // query xem email đã tồn tại chưa
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ message: "Email already registered" });
  }

  // băm mật khẩu trước khi lưu
  const passwordHash = await hashPassword(password);

  //query tạo user mới với role USER và status ACTIVE
  const user = await User.create({
    fullName,
    email,
    passwordHash,
    role: "USER",
    status: "ACTIVE",
  });

  // tạo thành công trả về thông tin user (không có passwordHash)
  return res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});

// hàm đăng nhập
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // tìm user theo email , dùng .select('+passwordHash') để lấy cả trường passwordHash
  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user) {
    //nếu không tìm thấy user thì trả về lỗi 401
    return res.status(401).json({ message: "Invalid email or password" });
  }

  //nếu user có nhưng status không phải ACTIVE thì trả về lỗi 403 (không có quyền)
  if (user.status !== "ACTIVE") {
    return res.status(403).json({ message: "Account is not active" });
  }

  // nếu qua được các bước trên, tức là user tồn tại và đang ACTIVE
  // xác minh mật khẩu
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  //tạo access token để xác thực user khi truy cập các API cần quyền
  const accessToken = signAccessToken({
    user_id: user._id.toString(),
    role: user.role,
  });

  // tạo refresh token để lấy access token mới khi access token hết hạn
  const refreshToken = signRefreshToken({
    user_id: user._id.toString(),
    role: user.role,
  });

  // trả về access token và thông tin user (không có passwordHash)
  return res.json({
    access_token: accessToken,
    refresh_token: refreshToken,
    user: {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});
