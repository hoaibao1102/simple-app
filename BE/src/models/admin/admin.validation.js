import { z } from "zod";

// Schema để validate query parameters khi lấy danh sách users
export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  role: z.enum(["ADMIN", "USER"]).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  search: z.string().trim().optional(), // Tìm kiếm theo email hoặc fullName
});

// Schema để validate params khi lấy user theo ID
export const userIdParamsSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
});

// Schema để validate body khi cập nhật user
export const updateUserSchema = z.object({
  role: z.enum(["ADMIN", "USER"]).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  fullName: z.string().trim().min(1).max(100).optional(),
});
