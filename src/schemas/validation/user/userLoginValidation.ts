import { object, string } from "yup";

const userLoginValidation = object({
  email: string().email("Please enter valid email value!"),
  username: string()
    .min(2, "Username should be longer than 2 characters!")
    .max(12, "Username can't be longer than 12 characters!"),
  password: string()
    .min(6, "Password should be longer than 6 characters!")
    .max(18, "Password can't be longer than 18 characters!")
    .matches(
      /^(?=.*[A-Z].*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
      "Password must contain at least 2 uppercase letters, 1 number, and 1 symbol!"
    )
    .required("This field can not be empty!"),
});

export default userLoginValidation;