import express, { Request, Response } from 'express';
import { UserViewModel } from '../viewmodels/userViewModel';

const userView = express.Router();
export default userView;

userView.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserViewModel.register(email, password);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

userView.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await UserViewModel.login(email, password);
    res.json({ user, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});
