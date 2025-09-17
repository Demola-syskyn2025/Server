import { db } from '../index';
import { User, IUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || '';
export class UserViewModel {
  static async register(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRef = await db.collection('users').add({ email, password: hashedPassword });
    return new User(email, hashedPassword, userRef.id);
  }

  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (snapshot.empty) throw new Error('User not found');
    const doc = snapshot.docs[0];
    const userData = doc.data() as IUser;
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) throw new Error('Invalid credentials');
    const user = new User(userData.email, userData.password, doc.id);
    const token = jwt.sign({ id: doc.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
  }
}
