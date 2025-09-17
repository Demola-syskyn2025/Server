import express from 'express';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import path from 'path';
// import { FIREBASE_CREDENTIALS } from './config/env';
import userView from './views/userView';
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

app.use('/', (req, res, next) => {
    console.log("API is running")
    if(FIREBASE_CREDENTIALS){
        console.log("Firebase credentials are set")
    }
    res.send("API is running")
})
app.use('/users', userView);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
