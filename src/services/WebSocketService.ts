// WebSocketService.js
import io from 'socket.io-client';

const socket = io('http://localhost:3000/');

// socket.on('active_problem', (message) => console.log("active problem", message));
socket.on('message', (message) => console.log("Message---------", message));
export class WebSocketService {

  constructor() {
  }

  connect = () => {
    socket.connect();
  }

  disconnect = () => {
    socket.disconnect();
  }

  createRoom = (roomId: string) => {
    let currentUserString: string | null = localStorage.getItem('user');
    if (currentUserString) {
      let currentUser = JSON.parse(currentUserString);
      socket.emit('admin_join', {
        name: currentUser.fullName,
        roomId: roomId,
        score: 0,
        id: currentUser.id
      })
    }
  }

  joinRoom = (roomId: string) => {
    let currentUserString: string | null = localStorage.getItem('user');
    if (currentUserString) {
      let currentUser = JSON.parse(currentUserString);
      socket.emit('user_join', {
        name: currentUser.fullName,
        roomId: roomId,
        score: 0,
        id: currentUser.id
      })
    }
  }

  addQuestion = (roomId: string, problem: any) => {
    socket.emit('create_problem', { roomId: roomId, problem: problem });
  }

  addQuiz = (roomId: string) => {
    socket.emit('create_quiz', { roomId: roomId });
  }

  startQuiz = (roomId: any) => {
    socket.emit('start_quiz', { roomId: roomId });
  }

  nextQuestion = (roomId: any) => {
    socket.emit('next', { roomId: roomId });
  }

  submitAnswer = (userId: any, problemId: any, roomId: any, submission: any) => {
    socket.emit('submit', {
      userId,
      problemId,
      submission,
      roomId
    })
  }

  finishTest = (roomId?: string) => {
    socket.emit('finish_test', { roomId: roomId });
  }

};

export { socket };