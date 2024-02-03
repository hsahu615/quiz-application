import { Server } from 'socket.io';
import http from 'http'
import { server } from '../index'

export class IOManager {
  private static io: Server;

  public static getIo() {
    if (this.io) {
      return this.io;
    } else {
      const io = new Server(server, {
        cors: {
          origin: '*'
        }
      });
      this.io = io;
    }
    return this.io;
  }

}