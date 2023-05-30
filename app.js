const express = require('express');
require('dotenv').config();
require('./models/db');

const userRouter = require('./routes/user');
const bandRouter = require('./routes/bands');
const musiciansRouter = require('./routes/musicians');
const router = express.Router();

const app = express();
const newRout = router.get('/', (req, res) => {
  res.json({ success: true, message: 'Hello' });
});
app.use(express.json());
app.use(userRouter);
app.use(bandRouter);
app.use(musiciansRouter);
app.use(newRout);

app.listen(8000, () => {
  // console.log('port is listening');
});
