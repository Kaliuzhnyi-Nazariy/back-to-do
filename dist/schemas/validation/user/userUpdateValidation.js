"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const userUpdateValidation = (0, yup_1.object)({
    username: (0, yup_1.string)()
        .min(2, "Username should be longer than 2 characters!")
        .max(12, "Username can't be longer than 12 characters!")
        .required("This field can not be empty!"),
    password: (0, yup_1.string)()
        .min(6, "Password should be longer than 6 characters!")
        .max(18, "Password can't be longer than 18 characters!")
        .matches(/^(?=.*[A-Z].*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, "Password must contain at least 2 uppercase letters, 1 number, and 1 symbol!")
        .required("This field can not be empty!"),
});
exports.default = userUpdateValidation;
