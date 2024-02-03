"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOManager = void 0;
const socket_io_1 = require("socket.io");
const index_1 = require("../index");
class IOManager {
    static getIo() {
        if (this.io) {
            return this.io;
        }
        else {
            const io = new socket_io_1.Server(index_1.server, {
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
