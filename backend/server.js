import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './DB/connectDB.js';

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Example app listening on port ${PORT}`);
});