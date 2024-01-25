"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOManager = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app = http_1.default.createServer();
class IOManager {
    static getIo() {
        if (this.io) {
            return this.io;
        }
        else {
            const io = new socket_io_1.Server(app, {
                cors: {
                    origin: '*'
                }
            });
            this.io = io;
        }
        return this.io;
    }
}
exports.IOManager = IOManager;
