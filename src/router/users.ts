import { Router } from "express";
import userCtrl from "../handlers/users";
import validate from "../middlewares/validate";
import userRegisterValidation from "../schemas/validation/user/userRegisterValidation";
import userLoginValidation from "../schemas/validation/user/userLoginValidation";
import userUpdateValidation from "../schemas/validation/user/userUpdateValidation";
import passport from "passport";

import "../strategies/local-strategy";

import { authenticated } from "../helpers/authenticated";

const router = Router();

router.post("/", validate(userRegisterValidation), userCtrl.register);

router.post(
  "/login",
  passport.authenticate("local"),
  validate(userLoginValidation),
  userCtrl.login
);

router.put("/", authenticated, validate(userUpdateValidation), userCtrl.update);

router.post("/logout", authenticated, userCtrl.logout);

router.delete("/:id", authenticated, userCtrl.delete);

export default router;
