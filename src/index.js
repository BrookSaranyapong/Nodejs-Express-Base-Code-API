const express = require('express');
const app = express();

require('dotenv').config();
const { syncDB } = require('./configs/db');
const {
  CONFIG: { PORT },
} = require('./common/constants/config');
const authRouter = require('./modules/auth');
const errorHandler = require('./common/middlewares/error-handler');
const ApplicationError = require('./common/errors/application-error');
const { ERROR } = require('./common/constants/responses/error-message');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.get('/throw', (req, res) => {
  throw new ApplicationError(ERROR[400].EMAIL_TAKEN, { email: 'foo@bar.com' });
});

app.get('/throw-zod', (_req, _res) => {
  const zodErr = { name: 'ZodError', issues: [{ path: ['email'], message: 'Invalid', code: 'invalid' }] };
  throw zodErr;
});
app.get('/throw-jwt', (_req, _res) => {
  const jwtErr = { name: 'JsonWebTokenError', message: 'jwt malformed' };
  throw jwtErr;
});
app.get('/throw-app', (_req, _res) => {
  throw new ApplicationError(ERROR[400].CLIENT_ERROR_400, { foo: 'bar' });
});

app.get('/', (req, res) => {
  res.send('hello api ');
});

app.use(errorHandler);

(async () => {
  await syncDB();
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
})();
