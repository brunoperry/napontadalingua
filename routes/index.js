// var express = require('express');
import express from 'express';

const routerIndex = express.Router();

routerIndex.get('/', (req, res, next) => {
  res.render('index', { title: 'Na Ponta da Língua' });
});

export default routerIndex;