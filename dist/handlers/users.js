"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
function getUsers(req, res) {
    res.send([]);
}
function getUserById(req, res) {
    res.send([]);
}
function createUser(req, res) {
    // const { id, email, username } = req.body;
    res.status(201).send({
        id: "1",
        email: "ensen@mail.com",
        username: "ensem",
    });
}
