// zod để xác thực dữ liệu cho đăng ký và đăng nhập
import { z } from "zod";

// Schema xác thực dữ liệu đăng ký
//fullName: chuỗi, tối thiểu 2 ký tự
//email: chuỗi, định dạng email hợp lệ, chuyển thành chữ thường
//password: chuỗi, tối thiểu 8 ký tự
export const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email format").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Schema xác thực dữ liệu đăng nhập
//email: chuỗi, định dạng email hợp lệ, chuyển thành chữ thường
//password: chuỗi, tối thiểu 8 ký tự
export const loginSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
