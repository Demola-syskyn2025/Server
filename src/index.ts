import express from 'express';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import path from 'path';
import patientView from './views/patientView';
import dotenv from 'dotenv';

dotenv.config();
const FIREBASE_CREDENTIALS = process.env.FIREBASE_CREDENTIALS || '';
const serviceAccount = require(path.resolve(process.cwd(), FIREBASE_CREDENTIALS));

initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();

const app = express();
app.use(express.json());

app.use('/patients', patientView);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
