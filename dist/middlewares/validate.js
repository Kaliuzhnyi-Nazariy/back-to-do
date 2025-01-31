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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validate;
function validate(validationSchema) {
    const fn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield validationSchema.validate(req.body, { abortEarly: false });
            next();
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    message: "Validation error",
                    details: error.inner.map((err) => err.message),
                });
            }
            else {
                next(error);
            }
        }
    });
    return fn;
}
