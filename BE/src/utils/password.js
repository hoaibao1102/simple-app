//bcrypt của thư viện bcryptjs để băm và xác minh mật khẩu
import bcrypt from "bcryptjs";

// hàm băm mật khẩu
// plainPassword: mật khẩu gốc chưa băm
//saltRounds: số lần băm, càng nhiều càng an toàn nhưng tốn thời gian hơn
export async function hashPassword(plainPassword) {
  const saltRounds = 10;
  return bcrypt.hash(plainPassword, saltRounds);
}

// hàm xác minh mật khẩu
// khi gọi hàm này , ta truyền vào mật khẩu gốc và mật khẩu đã băm
// hàm sẽ trả về true nếu khớp, false nếu không khớp bằng cách sử dụng
// bcrypt.compare
export async function verifyPassword(plainPassword, passwordHash) {
  return bcrypt.compare(plainPassword, passwordHash);
}
