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
const express_1 = __importDefault(require("express"));
const auth_1 = require("../models/auth");
const userRoutes = express_1.default.Router();
userRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.user;
    const user = yield auth_1.Person.findOne({ username: data.username, password: data.password });
    if (user) {
        res.status(200).json({ message: "Welcome: " + user.email, user: user });
    }
    else {
        res.status(401).json({ message: "Invalid Credentails" });
    }
}));
userRoutes.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const isPresent = yield auth_1.Person.findOne({ username: user.username });
    if (isPresent) {
        res.send("User alredy present.");
    }
    else {
        const id = yield auth_1.Person.create(user);
        res.status(200).json({ message: "Successful", id: id });
    }
}));
exports.default = userRoutes;
