import { Socket } from 'socket.io';
import QuizManager from './QuizManager';

export interface User {
  name: string,
  roomId: string,
  score: number;
  id: string
}

export class UserManager {

  quizManager: QuizManager = new QuizManager();

  addUser(socket: Socket) {
    this.createHandlers(socket);
  }

  createHandlers(socket: Socket) {
    socket.on('admin_join', (data: User) => {
      console.log("admin joined: ", data);

      socket.on('create_quiz', (data) => {
        this.quizManager.createQuiz(data.roomId);
      })

      socket.on('createProblem', (data) => {
        this.quizManager.addProblem(data.roomId, data.problem);
      })

      socket.on('start_quiz', (data) => {
        this.quizManager.startQuiz(data.roomId);
      })

      socket.on('next', (data) => {
        this.quizManager.next(data.roomId);
      })
    })

    socket.on('user_join', (data: User) => {
      const userId = this.quizManager.addUser(data.roomId, data.name);
      socket.join(data.roomId);
      socket.emit('message', data.name + " joined the room");
    })

    socket.on('submit', (data) => {
      const userId = data.userId;
      const problemId = data.problemId;
      const roomId = data.roomId;
      const submission = data.submission;
      this.quizManager.submit(userId, roomId, problemId, submission);
    })
  }
}