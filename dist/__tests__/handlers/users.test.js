"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __mocks__1 = require("../../__mocks__");
const users_1 = require("../../handlers/users");
describe("getUsers", () => {
    it("Should return an array of users", () => {
        (0, users_1.getUsers)(__mocks__1.mockRequest, __mocks__1.mockResponse);
        expect(__mocks__1.mockResponse.send).toHaveBeenCalledWith([]);
    });
});
