import {IOManager} from './controllers/IOManager';
import { UserManager } from './controllers/UserManager';

const io = IOManager.getIo();

io.listen(3000);


io.on('connection', (socket) => {
  const userManager = new UserManager();
  userManager.addUser(socket);
}) 