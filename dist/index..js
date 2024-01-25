"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IOManager_1 = require("./controllers/IOManager");
const UserManager_1 = require("./controllers/UserManager");
const io = IOManager_1.IOManager.getIo();
io.listen(3000);
io.on('connection', (socket) => {
    const userManager = new UserManager_1.UserManager();
    userManager.addUser(socket);
});
