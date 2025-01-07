import { createApp } from "./createApp";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";

dotenv.config();

const app = createApp();

const { PORT, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST as string)
  .then(() => {
    app.listen(PORT || 3001);
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });
