import express from 'express';
import { getDB, doLogin } from '../backend.js';

const NPDLRouter = express.Router();

NPDLRouter.route('/').get((req, res) => {
  res.render('pages/index');
});

NPDLRouter.route('/servicos').get((req, res) => {
  res.render('pages/servicos');
});

NPDLRouter.route('/sobre').get((req, res) => {
  res.render('pages/sobre');
});

NPDLRouter.route('/contactos').get((req, res) => {
  res.render('pages/contactos');
});

NPDLRouter.route('/login').get((req, res) => {
  res.render('pages/login');
});

NPDLRouter.route('*').get((req, res) => {
  res.render('pages/404');
});

NPDLRouter.route('/doLogin').post((req, res) => {
  doLogin(req.body);

  console.log('body', req.body);
  res.send({
    email: 'ildjs',
    password: 'wjh',
  });
});

export default NPDLRouter;
