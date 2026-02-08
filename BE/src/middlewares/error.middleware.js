// Middleware xử lý lỗi trong ứng dụng
export function errorHandler(err, _req, res, _next) {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
}
