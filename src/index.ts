import { IOManager } from './controllers/IOManager';
import { UserManager } from './controllers/UserManager';
import { createServer } from 'http';
import mongoose from './config/database';
import express from 'express';
import userRoutes from './routes/UserRoutes';
import cors from 'cors';
const app = express();
export const server = createServer(app);

mongoose;
app.use(cors())
app.use(express.json());
app.use('/auth', userRoutes);

const io = IOManager.getIo();

io.on('connection', (socket) => {
  const userManager = new UserManager();
  userManager.addUser(socket);
})

server.listen(process.env.PORT, () => {
  console.log("Server started at port: ", process.env.PORT)
})

