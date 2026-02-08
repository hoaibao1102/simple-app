// Hàm này xử lý các route bất đồng bộ và
// chuyển lỗi cho middleware xử lý lỗi
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
//=>Ý nghĩa: controller async mà throw lỗi → tự chạy vào errorHandler
