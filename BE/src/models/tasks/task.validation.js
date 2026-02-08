import { z } from "zod";

// Schema để xác thực dữ liệu khi tạo task
export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(120),
  description: z.string().max(2000).optional().default(""),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
});

// Schema để xác thực dữ liệu khi cập nhật task
export const updateTaskSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  description: z.string().max(2000).optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
});

// Schema để xác thực query parameters khi lấy danh sách task
export const listTasksQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
});

// Schema để xác thực tham số đường dẫn khi thao tác với task cụ thể
export const taskIdParamsSchema = z.object({
  id: z.string().min(1, "Task id is required"),
});
