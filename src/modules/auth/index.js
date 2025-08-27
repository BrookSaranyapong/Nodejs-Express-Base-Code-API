const { Router } = require('express');
const { validate, validateAll } = require('../../common/middlewares/validate');
const { me, register, login } = require('./controllers/auth.controller');
const { RegisterSchema } = require('./validations/register.validation');
const { LoginSchema } = require('./validations/login.validation');
const { PaginationQuerySchema } = require('./validations/pagination.validation');
const { UserIdParamsSchema } = require('./validations/userParams.validation');
const ApplicationError = require('../../common/errors/application-error');
const { ERROR } = require('../../common/constants/responses/error-message');

const router = Router();

router.get('/', me);

router.get('/throw', (req, res) => {
  throw new ApplicationError(ERROR[400].EMAIL_TAKEN, { email: 'foo@bar.com' });
});

router.post(
  '/register',
  validate(RegisterSchema), // default = body
  register
);

router.post('/login', validate(LoginSchema), login);

router.get('/users/:id', validateAll({ params: UserIdParamsSchema, query: PaginationQuerySchema }));

module.exports = router;
