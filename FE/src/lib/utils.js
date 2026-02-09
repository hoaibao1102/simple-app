import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// utils này được sử dụng để kết hợp các lớp CSS một cách hiệu quả,
//  đặc biệt là khi sử dụng Tailwind CSS
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
