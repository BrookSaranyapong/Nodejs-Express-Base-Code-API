const express = require('express');
const app = express();

require('dotenv').config();
const { syncDB } = require('./configs/db');
const {
  CONFIG: { PORT },
} = require('./common/constants/config');
const authRouter = require('./modules/auth');
const errorHandler = require('./common/middlewares/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('hello api ');
});

app.use(errorHandler);

(async () => {
  await syncDB();
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
})();
