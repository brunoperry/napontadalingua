
import express from 'express';
import {initializeApp} from 'firebase/app';
import NPDLRouter from './routes/NPDLRouter.js';
// import {express} from 'express';
// const cors = require('cors');
import {getDB} from "./config.js";
// const User = require('./config.js')
// const NPDLRouter = require('./routes/NPDLRouter');

const app = express();
app.use(express.static('public'));
app.use('/', NPDLRouter);
// app.use(cors());



const port = 3000;
app.listen(port, () => {
  console.log('Node js Express js Tutorial');
});