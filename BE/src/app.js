import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

export function createApp() {
  // Tạo ứng dụng Express để thiết lập các middleware và route
  const app = express();

  // Security headers , helmet giúp bảo vệ ứng dụng bằng cách thiết lập các header HTTP bảo mật
  app.use(helmet());

  // Access logs, morgan để ghi lại các yêu cầu HTTP đến server
  app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));

  // Parse JSON body , express.json() để phân tích cú pháp các yêu cầu có định dạng JSON
  app.use(express.json({ limit: "1mb" }));

  // CORS dùng để cho phép hoặc hạn chế các yêu cầu từ các nguồn khác nhau
  app.use(
    cors({
      origin: env.corsOrigin,
    }),
  );

  //sau khi cấu hình các middleware toàn cục, ta sẽ đến phần định nghĩa các route cho ứng dụng
  // Mount routes điều hướng tất cả các yêu cầu bắt đầu bằng /api đến bộ định tuyến chính
  app.use("/api", routes);

  // Swagger UI để cung cấp giao diện người dùng cho tài liệu API được tạo bởi swagger-jsdoc
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // 404
  app.use(notFound);

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}
