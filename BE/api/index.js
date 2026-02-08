import { createApp } from "../src/app.js";
import { connectDB } from "../src/config/db.js";

let app = null;
let isConnected = false;

async function initializeApp() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  if (!app) {
    app = createApp();
  }

  return app;
}

export default async function handler(req, res) {
  try {
    const app = await initializeApp();
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
}
