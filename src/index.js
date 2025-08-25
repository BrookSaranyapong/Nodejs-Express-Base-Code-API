const express = require('express');
const app = express();
// const productRouter = require('./modules/products');
const errorHandler = require('./common/middlewares/errorHandler');
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/products', productRouter);
// app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('hello api ');
});

app.use(errorHandler);

app.listen(4000, () => {
  console.log(`localhost:4000`);
});
