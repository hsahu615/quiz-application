import { quizzes } from '../models/quizzes';
import { Quiz } from './Quiz';

export default class QuizManager {
  next(roomId: any) {
    const quiz = this.getQuiz(roomId);
    quiz?.next();
  }

  submit(userId: any, roomId: any, problemId: any, submission: any) {
    const quiz = this.getQuiz(roomId);
    quiz?.submit(userId, problemId, submission);
  }

  addUser(roomId: string, name: string) {
    const quiz = this.getQuiz(roomId);
    quiz?.addUser(name);
  }

  addProblem(roomId: any, problem: any) {
    const quiz: Quiz | undefined = this.getQuiz(roomId);
    quiz?.addProblem(problem);
  }

  createQuiz(roomId: any) {
    if (this.getQuiz(roomId)) {
      return;
    }
    const quiz = new Quiz(roomId);
    quizzes.push(quiz);
    console.log(quizzes);
  }

  getQuiz(roomId: string): Quiz | undefined {
    const quiz = quizzes.find((quiz) => quiz.getRoomId() === roomId);
    return quiz;
  }

  startQuiz(roomId: string) {
    const quiz: Quiz | undefined = this.getQuiz(roomId);
    if (quiz) {
      quiz.startQuiz();
    }
  }

}