import { Router } from "express";
import userCtrl from "../handlers/users";
import validate from "../middlewares/validate";
import userRegisterValidation from "../schemas/validation/user/userRegisterValidation";
import userLoginValidation from "../schemas/validation/user/userLoginValidation";
import userUpdateValidation from "../schemas/validation/user/userUpdateValidation";

const router = Router();

// router.get("/", userCtrl.getUser);

// router.get("/:id", getUserById);

router.post("/", validate(userRegisterValidation), userCtrl.register);

router.post("/login", validate(userLoginValidation), userCtrl.login);

router.put("/", validate(userUpdateValidation), userCtrl.update);

router.post("/logout", userCtrl.logout);

router.delete("/:id", userCtrl.delete);

export default router;
