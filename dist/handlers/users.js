"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../schemas/user"));
const ErrorHandler_1 = require("../helpers/ErrorHandler");
const ctrlWrapper_1 = __importDefault(require("../helpers/ctrlWrapper"));
const discord_user_1 = __importDefault(require("../schemas/discord-user"));
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.user);
        res.status(200).json();
    });
}
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password, confirmPassword } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (user) {
            next((0, ErrorHandler_1.errorHandler)(409, "This email already in use!"));
        }
        const userName = yield user_1.default.findOne({ username });
        if (userName) {
            next((0, ErrorHandler_1.errorHandler)(409, "This username already in use!"));
        }
        if (password !== confirmPassword) {
            next((0, ErrorHandler_1.errorHandler)(400, "Passwords are not match!"));
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield user_1.default.create({
            email,
            username,
            password: hashedPassword,
        });
        if (!newUser)
            throw (0, ErrorHandler_1.errorHandler)(500);
        const result = yield user_1.default.findById(newUser._id).select("-__v -password");
        if (!result)
            throw (0, ErrorHandler_1.errorHandler)(500);
        res.status(201).json(result);
    });
}
function discordUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("req.session: ", req.session);
        // console.log("user: ", req.user);
        var _a, _b;
        console.log("discord user");
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id))
            throw (0, ErrorHandler_1.errorHandler)(401, "HERE");
        // let userData;
        let userData = yield discord_user_1.default.findOne({
            discordId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
        });
        try {
            // userData: DiscordUserInt | null = await DiscordUser.findOne({ discordId: req.user?.id });
        }
        catch (error) {
            console.log(error);
            throw (0, ErrorHandler_1.errorHandler)(404, error.message);
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
    });
}
function discordUserCheck(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.user);
        console.log(req.session);
    });
}
// async function linkedinUser(req: Request, res: Response, next: NextFunction) {
//   console.log(req.session);
//   console.log(req.user);
//   res.status(200).json();
// }
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password } = req.body;
        let user = null;
        if (email) {
            // console.log(email);
            user = yield user_1.default.findOne({ email }, "-__v");
        }
        else if (username) {
            user = yield user_1.default.findOne({ username }, "-__v");
        }
        if (!user) {
            return next((0, ErrorHandler_1.errorHandler)(404, "User not found"));
        }
        const compPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!compPassword)
            next((0, ErrorHandler_1.errorHandler)(400, "Wrong email/username or password!"));
        res
            .status(200)
            .json({ _id: user._id, email: user.email, username: user.username });
    });
}
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password } = req.body;
        const userForUpd = yield user_1.default.findOne({ email }, "-__v");
        if (!userForUpd)
            throw (0, ErrorHandler_1.errorHandler)(400);
        const newUser = yield user_1.default.findByIdAndUpdate(userForUpd._id, {
            email,
            username,
            password,
        }, { new: true });
        if (!newUser)
            throw (0, ErrorHandler_1.errorHandler)(500, "Something went wrong!");
        res.status(200).json({
            _id: newUser._id,
            email: newUser.email,
            username: newUser.username,
        });
    });
}
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user)
            throw (0, ErrorHandler_1.errorHandler)(401);
        req.logout((err) => {
            if (err)
                throw (0, ErrorHandler_1.errorHandler)(400);
            res.status(204).json();
        });
    });
}
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: _id } = req.params;
        const user = yield user_1.default.findById(_id);
        if (!user)
            throw (0, ErrorHandler_1.errorHandler)(404, "User not found!");
        yield user_1.default.findByIdAndDelete(_id);
        res.status(204).json();
    });
}
exports.default = {
    getUser: (0, ctrlWrapper_1.default)(getUser),
    register: (0, ctrlWrapper_1.default)(createUser),
    discord: (0, ctrlWrapper_1.default)(discordUser),
    dsCheck: (0, ctrlWrapper_1.default)(discordUserCheck),
    // linkedin: ctrlWrapper(linkedinUser),
    login: (0, ctrlWrapper_1.default)(loginUser),
    update: (0, ctrlWrapper_1.default)(updateUser),
    logout: (0, ctrlWrapper_1.default)(logoutUser),
    delete: (0, ctrlWrapper_1.default)(deleteUser),
};
