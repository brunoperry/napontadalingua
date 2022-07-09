import express from 'express';
const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

export default userRouter;
