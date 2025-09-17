import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const FIREBASE_CREDENTIALS = process.env.FIREBASE_CREDENTIALS || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';
