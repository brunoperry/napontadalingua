import express from 'express';
import NPDLRouter from './routes/NPDLRouter.js';
import bodyParser from 'body-parser';

const app = express();
//SETS
app.set('view engine', 'ejs');

//USES
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ROUTES
app.use('/', NPDLRouter);

const port = 3000;
app.listen(port, () => {
  console.log('Na Ponta da Lingua running on port 3000');
});
