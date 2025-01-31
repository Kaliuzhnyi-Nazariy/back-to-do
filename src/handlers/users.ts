import { NextFunction, Request, Response } from "express-serve-static-core";
import { CreateUserDto, LoginUserDto } from "../dtos/CreateUser.dtos";
import { User as UserType } from "../types/response";

import bcrypt from "bcrypt";
import User from "../schemas/user";
import { errorHandler } from "../helpers/ErrorHandler";
import { IUser, UserSchema } from "../schemas/types/user.schema";
import ctrlWrapper from "../helpers/ctrlWrapper";
import DiscordUser from "../schemas/discord-user";
import { DiscordUserInt } from "../schemas/types/discordUser.schema";

async function getUser(req: Request, res: Response) {
  console.log(req.user);
  res.status(200).json();
}

async function createUser(
  req: Request<{}, {}, CreateUserDto>,
  res: Response<UserType>,
  next: NextFunction
) {
  const { email, username, password, confirmPassword } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    next(errorHandler(409, "This email already in use!"));
  }

  const userName = await User.findOne({ username });

  if (userName) {
    next(errorHandler(409, "This username already in use!"));
  }

  if (password !== confirmPassword) {
    next(errorHandler(400, "Passwords are not match!"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  if (!newUser) throw errorHandler(500);

  const result: UserType | null = await User.findById(newUser._id).select(
    "-__v -password"
  );

  if (!result) throw errorHandler(500);

  res.status(201).json(result);
}

async function discordUser(req: Request, res: Response, next: NextFunction) {
  // console.log("req.session: ", req.session);
  // console.log("user: ", req.user);

  console.log("discord user");

  if (!req.user?.id) throw errorHandler(401, "HERE");

  // let userData;

  let userData: DiscordUserInt | null = await DiscordUser.findOne({
    discordId: req.user?.id,
  });

  try {
    // userData: DiscordUserInt | null = await DiscordUser.findOne({ discordId: req.user?.id });
  } catch (error: any) {
    console.log(error);
    throw errorHandler(404, error.message);
  }

  req.session.userDiscord = userData;

  res.redirect("/api/users/discord/check");
  return;
  // const { email, username, password, confirmPassword } = req.body;
  // const user = await User.findOne({ email });
  // if (user) {
  //   next(errorHandler(409, "This email already in use!"));
  // }
  // const userName = await User.findOne({ username });
  // if (userName) {
  //   next(errorHandler(409, "This username already in use!"));
  // }
  // if (password !== confirmPassword) {
  //   next(errorHandler(400, "Passwords are not match!"));
  // }
  // const hashedPassword = await bcrypt.hash(password, 10);
  // const newUser = await User.create({
  //   email,
  //   username,
  //   password: hashedPassword,
  // });
  // if (!newUser) throw errorHandler(500);
  // const result: UserType | null = await User.findById(newUser._id).select(
  //   "-__v -password"
  // );
  // if (!result) throw errorHandler(500);
  // res.status(201).json(result);
}

async function discordUserCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.user);
  console.log(req.session);
}

// async function linkedinUser(req: Request, res: Response, next: NextFunction) {
//   console.log(req.session);
//   console.log(req.user);

//   res.status(200).json();
// }

async function loginUser(
  req: Request<{}, {}, LoginUserDto>,
  res: Response<UserType>,
  next: NextFunction
) {
  const { email, username, password } = req.body;

  let user: UserSchema | null = null;

  if (email) {
    // console.log(email);
    user = await User.findOne({ email }, "-__v");
  } else if (username) {
    user = await User.findOne({ username }, "-__v");
  }

  if (!user) {
    return next(errorHandler(404, "User not found"));
  }

  const compPassword = await bcrypt.compare(password, user.password);

  if (!compPassword)
    next(errorHandler(400, "Wrong email/username or password!"));

  res
    .status(200)
    .json({ _id: user._id, email: user.email, username: user.username });
}

async function updateUser(
  req: Request<{}, {}, LoginUserDto>,
  res: Response<UserType>,
  next: NextFunction
) {
  const { email, username, password } = req.body;

  const userForUpd: UserSchema | null = await User.findOne({ email }, "-__v");

  if (!userForUpd) throw errorHandler(400);

  const newUser: UserSchema | null = await User.findByIdAndUpdate(
    userForUpd._id,
    {
      email,
      username,
      password,
    },
    { new: true }
  );

  if (!newUser) throw errorHandler(500, "Something went wrong!");

  res.status(200).json({
    _id: newUser._id,
    email: newUser.email,
    username: newUser.username,
  });
}

async function logoutUser(req: Request, res: Response) {
  if (!req.user) throw errorHandler(401);

  req.logout((err) => {
    if (err) throw errorHandler(400);
    res.status(204).json();
  });
}

async function deleteUser(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const { id: _id } = req.params;

  const user = await User.findById(_id);

  if (!user) throw errorHandler(404, "User not found!");

  await User.findByIdAndDelete(_id);

  res.status(204).json();
}

export default {
  getUser: ctrlWrapper(getUser),
  register: ctrlWrapper(createUser),
  discord: ctrlWrapper(discordUser),
  dsCheck: ctrlWrapper(discordUserCheck),
  // linkedin: ctrlWrapper(linkedinUser),
  login: ctrlWrapper(loginUser),
  update: ctrlWrapper(updateUser),
  logout: ctrlWrapper(logoutUser),
  delete: ctrlWrapper(deleteUser),
};
