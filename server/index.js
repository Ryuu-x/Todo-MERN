import express from 'express';
import DBConnection from './database/db.js';
import cors from 'cors';
import Routes from './routes/route.js'
import bodyParser from 'body-parser';

const PORT = 8000;
const app = express();

app.use(cors());

app.use(bodyParser.json({ extended:true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Routes);

DBConnection();

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });
