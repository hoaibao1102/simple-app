// mongoose là thư viện để kết nối và tương tác với MongoDB
import mongoose from "mongoose";
import { env } from "./env.js";

// Hàm kết nối đến cơ sở dữ liệu MongoDB
export async function connectDB() {
  if (!env.mongodbUri) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(env.mongodbUri);

  console.log("✅ MongoDB connected");
}
