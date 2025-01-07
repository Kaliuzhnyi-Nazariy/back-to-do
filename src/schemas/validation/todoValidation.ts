import * as yup from "yup";

const todoValidation = yup.object({
  title: yup
    .string()
    .min(2, "Title should be more than 2 caracters!")
    .required(),
  description: yup
    .string()
    .max(256, "Description can't be more than 256 caracters!")
    .required(),
  status: yup.string().oneOf(["to-do", "in progress", "done"]).default("to-do"),
});

export default todoValidation;
