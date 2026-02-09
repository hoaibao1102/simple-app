import { Router } from "express";
import authRoutes from "../models/auth/auth.routes.js";
import userRoutes from "../models/users/user.routes.js";
import taskRoutes from "../models/tasks/task.routes.js";
import adminRoutes from "../models/admin/admin.routes.js";

const router = Router();

// Health check là route để kiểm tra xem server có đang chạy hay không
/**
 * @swagger
 * /api/health:
 *   get:
 *     tags: [Health]
 *     summary: Health check
 *     description: Returns basic service health information.
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 service:
 *                   type: string
 *                   example: Task Manager API
 */
router.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    service: "Task Manager API",
  });
});

// api có tiền tố /auth sẽ được điều hướng đến authRoutes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/admin", adminRoutes);

export default router;
