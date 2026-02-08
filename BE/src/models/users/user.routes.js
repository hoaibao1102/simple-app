import { Router } from "express";
import { getMe } from "./user.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get my profile
 *     description: Returns the profile of currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized (missing/invalid access token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// route lấy thông tin user hiện tại
router.get("/me", requireAuth, getMe);

export default router;
