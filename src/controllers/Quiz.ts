import { users } from '../models/users';
import { IOManager } from './IOManager';

export interface Problem {
  startTime?: any;
  question: string,
  answer: AllowedSubmissions,
  options: {
    id: number,
    title: string
  }[],
  id: string,
  submissions: Submission[]
}

export type AllowedSubmissions = 0 | 1 | 2 | 3;

interface Submission {
  problemId: string;
  userId: string;
  isCorrect: boolean;
  optionSelected: AllowedSubmissions
}

export class Quiz {
  problems: Problem[] = [];
  roomId: string;
  problemNumber: number = 0;

  constructor(roomId: string) {
    this.roomId = roomId;
  }

  getRoomId() {
    return this.roomId;
  }

  addProblem(problem: Problem) {
    this.problems.push(problem);
    console.log(this.problems)
  }

  startQuiz() {
    if (this.problems.length) {
      this.setActiveProblem(this.problems[0]);
    }
  }

  setActiveProblem(problem: Problem) {
    console.log(problem);
    problem.startTime = new Date().getTime();
    IOManager.getIo().to(this.roomId).emit('active_problem', {
      problem
    });

    setTimeout(() => {
      this.showLeaderBoard();
    }, 1000 * 60)
  }

  showLeaderBoard() {
    const leaderboard = this.getLeaderBoard();
    IOManager.getIo().to(this.roomId).emit('show_leaderboard', {
      leaderboard
    })
  }

  getLeaderBoard() {
    return users.sort((u1, u2) => u1.score < u2.score ? 1 : -1).slice(0, 20);
  }

  addUser(name: string) {
    const id = this.genRandomString(7);
    users.push({
      id, name, score: 0, roomId: this.roomId
    })
  }

  genRandomString(length: number) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
    var charLength = chars.length;
    var result = '';
    for (var i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }

  submit(userId: string, problemId: string, submission: AllowedSubmissions) {
    const problem = this.problems.find(problem => problem.id = problemId)
    const user = users.find(user => user.id == userId);
    if (!problem || !user) {
      console.log("Problem or user not found!!")
      return;
    }
    const existingSubmission = problem.submissions.find(user => user.userId == userId);
    if (existingSubmission) {
      console.log("existing submission");
      return;
    }
    problem.submissions.push({
      problemId,
      userId,
      isCorrect: problem.answer === submission,
      optionSelected: submission
    })
    user.score += (1000 - (500 * (new Date().getTime() - problem.startTime) / (1000 * 60)));
  }

  next() {
    this.problemNumber++;
    const problem = this.problems[this.problemNumber];
    if (problem)
      this.setActiveProblem(problem);
    else {
      console.log("quiz over");
    }

  }

}