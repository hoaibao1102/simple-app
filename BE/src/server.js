//cái này sẽ là file khởi động server , chạy đầu tiên
import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

// Hàm khởi động server
async function bootstrap() {
  // Kết nối đến cơ sở dữ liệu MongoDB
  await connectDB();

  // Tạo ứng dụng Express
  const app = createApp();

  // Lắng nghe kết nối trên cổng đã cấu hình
  app.listen(env.port, () => {
    console.log(`🚀 Server running on http://localhost:${env.port}`);
  });
}

// Bắt đầu khởi động server và xử lý lỗi nếu có
bootstrap().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
