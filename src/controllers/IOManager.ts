import { Server } from 'socket.io';
import http from 'http'
const app = http.createServer();

export class IOManager {
  private static io: Server;

  public static getIo() {
    if(this.io) {
      return this.io;
    } else {
      const io = new Server(app, {
        cors: {
          origin: '*'
        }
      });
      this.io = io;
    }
    return this.io;
  }

}