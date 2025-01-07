import express from "express";
import userRoutes from "./router/users";
import todosRoutes from "./router/todos";
import cors from "cors";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use("/api/users", userRoutes);

  app.use("/api/todos", todosRoutes);

  return app;
}
