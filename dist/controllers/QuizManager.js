"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quizzes_1 = require("../models/quizzes");
const Quiz_1 = require("./Quiz");
class QuizManager {
    next(roomId) {
        const quiz = this.getQuiz(roomId);
        quiz === null || quiz === void 0 ? void 0 : quiz.next();
    }
    submit(userId, roomId, problemId, submission) {
        const quiz = this.getQuiz(roomId);
        quiz === null || quiz === void 0 ? void 0 : quiz.submit(userId, problemId, submission);
    }
    addUser(roomId, name) {
        const quiz = this.getQuiz(roomId);
        quiz === null || quiz === void 0 ? void 0 : quiz.addUser(name);
    }
    addProblem(roomId, problem) {
        const quiz = this.getQuiz(roomId);
        quiz === null || quiz === void 0 ? void 0 : quiz.addProblem(problem);
    }
    createQuiz(roomId) {
        if (this.getQuiz(roomId)) {
            return;
        }
        const quiz = new Quiz_1.Quiz(roomId);
        quizzes_1.quizzes.push(quiz);
        console.log(quizzes_1.quizzes);
    }
    getQuiz(roomId) {
        const quiz = quizzes_1.quizzes.find((quiz) => quiz.getRoomId() === roomId);
        return quiz;
    }
    startQuiz(roomId) {
        const quiz = this.getQuiz(roomId);
        if (quiz) {
            quiz.startQuiz();
        }
    }
}
exports.default = QuizManager;
