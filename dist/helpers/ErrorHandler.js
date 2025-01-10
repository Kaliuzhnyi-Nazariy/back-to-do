"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorMessages = {
    400: "Bad credantials!",
    401: "Unathorized!",
    403: "Frobidden!",
    404: "Not found!",
    409: "Conflict",
    500: "Server error",
};
const errorHandler = (status, message = errorMessages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
};
exports.errorHandler = errorHandler;
