import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

// hàm tạo access token với thời hạn cấu hình trong env
export function signAccessToken(payload) {
  return jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpiresIn,
  });
}

// hàm tạo refresh token với thời hạn cấu hình trong env
export function signRefreshToken(payload) {
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn,
  });
}

// hàm verify access token
export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwtAccessSecret);
}

// hàm verify refresh token
export function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwtRefreshSecret);
}

//note:
//access token thường dùng để xác thực user khi truy cập các API cần quyền
//refresh token dùng để lấy access token mới khi access token hết hạn
