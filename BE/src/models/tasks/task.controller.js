import mongoose from "mongoose";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Task } from "./task.model.js";
import e from "express";

function ensureObjectId(id) {
  // tránh crash khi id không đúng format
  return mongoose.Types.ObjectId.isValid(id);
}

// POST /api/tasks
//hàm tạo task mới
export const createTask = asyncHandler(async (req, res) => {
  //lấy id của người tạo từ req.user do đã qua middleware requireAuth
  const ownerId = req.user.user_id;

  const task = await Task.create({
    ...req.body,
    ownerId,
  });

  return res.status(201).json({
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
  });
});

// GET /api/tasks?page=&limit=&status=
// hàm lấy danh sách task với phân trang và lọc theo trạng thái
export const listTasks = asyncHandler(async (req, res) => {
  const ownerId = req.user.user_id;
  const { page, limit, status } = req.validatedQuery;

  const filter = {
    ownerId,
    deletedAt: null,
    ...(status ? { status } : {}),
  };

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("title description status createdAt updatedAt"),
    Task.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);

  return res.json({
    data: items.map((t) => ({
      id: t._id.toString(),
      title: t.title,
      description: t.description,
      status: t.status,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    })),
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
});

// GET /api/tasks/:id
export const getTaskById = asyncHandler(async (req, res) => {
  const ownerId = req.user.user_id;
  const { id } = req.validatedParams;

  if (!ensureObjectId(id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  const task = await Task.findOne({
    _id: id,
    ownerId,
    deletedAt: null,
  }).select("title description status createdAt updatedAt");

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json({
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  });
});

// PATCH /api/tasks/:id
export const updateTask = asyncHandler(async (req, res) => {
  const ownerId = req.user.user_id;
  const { id } = req.validatedParams;

  if (!ensureObjectId(id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  const task = await Task.findOneAndUpdate(
    { _id: id, ownerId, deletedAt: null },
    { $set: req.body },
    { new: true },
  ).select("title description status createdAt updatedAt");

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json({
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  });
});

// DELETE /api/tasks/:id (soft delete)
export const deleteTask = asyncHandler(async (req, res) => {
  const ownerId = req.user.user_id;
  const { id } = req.validatedParams;

  if (!ensureObjectId(id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  const task = await Task.findOneAndUpdate(
    { _id: id, ownerId, deletedAt: null },
    { $set: { deletedAt: new Date() } },
    { new: true },
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json({ message: "Task deleted successfully" });
});
