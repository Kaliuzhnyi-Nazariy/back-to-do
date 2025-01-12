import passport from "passport";
import { Strategy } from "passport-local";
import User from "../schemas/user";
import { errorHandler } from "../helpers/ErrorHandler";
import bcrypt from "bcrypt";

interface IUser {
  _id: string;
  username: string;
  email: string;
}

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

passport.serializeUser((user: IUser, done) => {
  // console.log("user: ");
  // console.log(user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw errorHandler(404);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    // console.log("username: ", username);
    // console.log("password: ", password);
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) throw errorHandler(400);

      const comparePassword = await bcrypt.compare(password, findUser.password);

      if (!comparePassword) throw errorHandler(400);
      done(null, findUser);
    } catch (error) {
      done(error, false);
    }
  })
);
