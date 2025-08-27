const { Router } = require('express');
const { validate, validateAll } = require('../../common/middlewares/validate');
const { me, register, login } = require('./controllers/auth.controller');
const { RegisterSchema } = require('./validations/register.validation');
const { LoginSchema } = require('./validations/login.validation');
const { PaginationQuerySchema } = require('./validations/pagination.validation');
const { UserIdParamsSchema } = require('./validations/userParams.validation');

const router = Router();

router.get('/', me);

router.post(
  '/register',
  validate(RegisterSchema), // default = body
  register
);

router.post('/login', validate(LoginSchema), login);

router.get('/users/:id', validateAll({ params: UserIdParamsSchema, query: PaginationQuerySchema }));

module.exports = router;
