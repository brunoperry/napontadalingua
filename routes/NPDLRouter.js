import express from 'express';
const NPDLRouter = express.Router();

NPDLRouter.route('/').get( (req, res) => {
  res.render('index');
});

NPDLRouter.route('/create').post( async (req, res) => {
  const data = req.body;
  console.log(data);
//   await User.add(data);
  res.send({ msg: 'User added' })
});

export default NPDLRouter;