import dotenv from "dotenv";

//dotenv config là để load biến môi trường từ file .env vào process.env
dotenv.config();

// Export các biến môi trường cần thiết cho ứng dụng
export const env = {
  //nodeEnv: phát triển hay production
  nodeEnv: process.env.NODE_ENV || "development",
  // cổng server sẽ lắng nghe
  port: Number(process.env.PORT || 5000),
  // chuỗi kết nối MongoDB
  mongodbUri: process.env.MONGODB_URI || "",
  // nguồn được phép truy cập tài nguyên (CORS)
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  // bí mật để ký và xác thực JWT access token
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "dev_access_secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "dev_refresh_secret",
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
};
