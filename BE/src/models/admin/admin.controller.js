import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../users/user.model.js";

// Lấy danh sách users (có phân trang và filter)
export const listUsers = asyncHandler(async (req, res) => {
  const { page, limit, role, status, search } = req.query;

  // Build query filter
  const filter = {};
  if (role) filter.role = role;
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { email: { $regex: search, $options: "i" } },
      { fullName: { $regex: search, $options: "i" } },
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const [users, total] = await Promise.all([
    User.find(filter)
      .select("fullName email role status createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);

  return res.json({
    data: users.map((user) => ({
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
});

// Lấy chi tiết một user theo ID
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select(
    "fullName email role status createdAt updatedAt",
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

// Cập nhật user (role, status, fullName)
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Không cho phép admin tự thay đổi role của chính mình
  if (id === req.user.user_id && updateData.role) {
    return res.status(403).json({
      message: "You cannot change your own role",
    });
  }

  const user = await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).select("fullName email role status createdAt updatedAt");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    message: "User updated successfully",
    user: {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});

// Xóa user (soft delete bằng cách set status = INACTIVE)
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Không cho phép admin tự xóa chính mình
  if (id === req.user.user_id) {
    return res.status(403).json({
      message: "You cannot delete your own account",
    });
  }

  const user = await User.findByIdAndUpdate(
    id,
    { $set: { status: "INACTIVE" } },
    { new: true },
  ).select("fullName email role status");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    message: "User deleted successfully (set to INACTIVE)",
    user: {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});
