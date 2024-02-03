import express from 'express';
import { Person } from '../models/auth'

const userRoutes = express.Router();

userRoutes.post('/login', async (req: any, res: any) => {
  const data = req.body.user;
  const user = await Person.findOne({ username: data.username, password: data.password });
  if (user) {
    res.status(200).json({ message: "Welcome: " + user.email, user: user });
  } else {
    res.status(401).json({ message: "Invalid Credentails" });
  }
})

userRoutes.post('/register', async (req: any, res: any) => {
  const user = req.body.user;
  const isPresent = await Person.findOne({ username: user.username });
  if (isPresent) {
    res.send("User alredy present.");
  } else {
    const id = await Person.create(user);
    res.status(200).json({ message: "Successful", id: id });
  }
})

export default userRoutes;