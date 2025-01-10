import { model, Schema } from "mongoose";
import helpers from "../helpers";
import { IUser, UserSchema } from "./types/user.schema";

const userSchema: Schema<UserSchema> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

(userSchema as any).post("save", helpers.handleMongooseError);

const User = model<UserSchema>("user", userSchema);

export default User;
