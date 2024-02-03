"use strict";
// server/config/database.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URL || '';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1); // Exit process with failure
});
exports.default = mongoose_1.default;
