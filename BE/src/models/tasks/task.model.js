import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },

    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
      default: "TODO",
      index: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    deletedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true },
);

// Helpful indexes for common queries
taskSchema.index({ ownerId: 1, status: 1, createdAt: -1 });

export const Task = mongoose.model("Task", taskSchema);
// Note: deletedAt field is used for soft deletion. If it's null, the task is active; otherwise, it's considered deleted.
