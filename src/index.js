const express = require('express');
const app = express();
// const productRouter = require('./modules/products');
const errorHandler = require('./common/middlewares/errorHandler');
const { syncDB } = require('./configs/db');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/products', productRouter);
// app.use('/auth', authRouter);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.get('/', (req, res) => {
  res.send('hello api ');
});

app.use(errorHandler);

await syncDB();

app.listen(4000, () => {
  console.log(`localhost:4000`);
});
