import express from "express";
import userRoutes from "./router/users";
import todosRoutes from "./router/todos";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { notFoundRoute } from "./router/notFound";
import { errorRoutes } from "./router/errorRoute";
import { IUser } from "./schemas/types/user.schema";
import passport from "passport";
import MongoStore from "connect-mongo";

declare module "express-session" {
  interface SessionData {
    visited?: boolean; // Add custom properties here
    user: IUser;
    [key: string]: any;
  }
}

export function createApp() {
  const app = express();

  const { SECRET_SESSION, DB_HOST } = process.env;

  app.use(express.json());
  app.use(cookieParser("YbK44CAKbN"));
  app.use(
    session({
      secret: String(SECRET_SESSION),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
      },
      store: MongoStore.create({
        // client: mongoose.connection.getClient(),
        mongoUrl: DB_HOST,
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cors());

  app.use("/api/users", userRoutes);

  app.use("/api/todos", todosRoutes);

  app.use(notFoundRoute);

  app.use(errorRoutes);

  return app;
}
