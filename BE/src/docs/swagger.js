import swaggerJsdoc from "swagger-jsdoc";
import { env } from "../config/env.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "Simple API for practicing Node.js + Express",
    },
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: "Local dev",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: { message: { type: "string" } },
        },
        ValidationError: {
          type: "object",
          properties: {
            message: { type: "string", example: "Validation error" },
            errors: { type: "object" },
          },
        },
        AuthTokens: {
          type: "object",
          properties: {
            access_token: { type: "string" },
            refresh_token: { type: "string" },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["fullName", "email", "password"],
          properties: {
            fullName: { type: "string", example: "Bao Le" },
            email: {
              type: "string",
              format: "email",
              example: "bao@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Password123",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "bao@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Password123",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            fullName: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["ADMIN", "USER"] },
            status: { type: "string", enum: ["ACTIVE", "INACTIVE"] },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            status: { type: "string", enum: ["TODO", "IN_PROGRESS", "DONE"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    tags: [
      { name: "Health", description: "Health check" },
      { name: "Auth", description: "Authentication" },
      { name: "Users", description: "User profile" },
      { name: "Tasks", description: "Task CRUD" },
    ],
  },
  apis: ["./src/modules/**/*.routes.js", "./src/routes/index.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
