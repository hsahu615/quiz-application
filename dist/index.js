"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const IOManager_1 = require("./controllers/IOManager");
const UserManager_1 = require("./controllers/UserManager");
const http_1 = require("http");
const database_1 = __importDefault(require("./config/database"));
const express_1 = __importDefault(require("express"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.server = (0, http_1.createServer)(app);
database_1.default;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', UserRoutes_1.default);
const io = IOManager_1.IOManager.getIo();
io.on('connection', (socket) => {
    const userManager = new UserManager_1.UserManager();
    userManager.addUser(socket);
});
exports.server.listen(process.env.PORT, () => {
    console.log("Server started at port: ", process.env.PORT);
});
