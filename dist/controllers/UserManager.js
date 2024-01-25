"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const QuizManager_1 = __importDefault(require("./QuizManager"));
class UserManager {
    constructor() {
        this.quizManager = new QuizManager_1.default();
    }
    addUser(socket) {
        this.createHandlers(socket);
    }
    createHandlers(socket) {
        socket.on('admin_join', (data) => {
            console.log("admin joined: ", data);
            socket.on('create_quiz', (data) => {
                this.quizManager.createQuiz(data.roomId);
            });
            socket.on('createProblem', (data) => {
                this.quizManager.addProblem(data.roomId, data.problem);
            });
            socket.on('start_quiz', (data) => {
                this.quizManager.startQuiz(data.roomId);
            });
            socket.on('next', (data) => {
                this.quizManager.next(data.roomId);
            });
        });
        socket.on('user_join', (data) => {
            const userId = this.quizManager.addUser(data.roomId, data.name);
            socket.join(data.roomId);
            socket.emit('message', data.name + " joined the room");
        });
        socket.on('submit', (data) => {
            const userId = data.userId;
            const problemId = data.problemId;
            const roomId = data.roomId;
            const submission = data.submission;
            this.quizManager.submit(userId, roomId, problemId, submission);
        });
    }
}
exports.UserManager = UserManager;
