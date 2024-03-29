"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const IOManager_1 = require("./controllers/IOManager");
const UserManager_1 = require("./controllers/UserManager");
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.server = (0, http_1.createServer)(app);
const io = IOManager_1.IOManager.getIo();
io.listen(3000);
io.on('connection', (socket) => {
    const userManager = new UserManager_1.UserManager();
    userManager.addUser(socket);
});
