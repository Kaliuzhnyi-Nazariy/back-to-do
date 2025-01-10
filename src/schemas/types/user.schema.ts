export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export interface UserSchema extends IUser {
  password: string;
}
