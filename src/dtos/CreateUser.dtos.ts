export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUserDto {
  username: string;
  email: string;
  password: string;
}
