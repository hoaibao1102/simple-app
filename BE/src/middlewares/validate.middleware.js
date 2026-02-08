// middleware để validate dữ liệu đầu vào ( là dữ liệu mà client request) sử dụng zod
export function validateBody(schema) {
  return (req, res, next) => {
    // sử dụng zod để parse và validate dữ liệu
    //hàm safeParse sẽ không ném lỗi mà trả về đối tượng kết quả
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: parsed.error.flatten(),
      });
    }
    //nếu hợp lệ thì gán lại req.body thành dữ liệu đã parse
    // (đã được chuyển đổi nếu có)
    req.body = parsed.data;
    next();
  };
}

//middleware để validate query parameters
//là dữ liệu trong req.query có đúng định dạng không
export function validateQuery(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: parsed.error.flatten(),
      });
    }
    req.validatedQuery = parsed.data;
    next();
  };
}

// middleware để validate params (tham số đường dẫn)
//là dữ liệu trong req.params có đúng định dạng không
// ví dụ: /tasks/:id  thì id là params
export function validateParams(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: parsed.error.flatten(),
      });
    }
    req.validatedParams = parsed.data;
    next();
  };
}
