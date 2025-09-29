const { Router } = require('express');
const { validate, validateAll } = require('../../common/middlewares/validate');
const { me, register, login, refresh, logout } = require('./controllers/auth.controller');
// const { RegisterSchema } = require('./validations/register.validation');
const { LoginSchema } = require('./validations/login.validation');
const { PaginationQuerySchema } = require('./validations/pagination.validation');
const { UserIdParamsSchema } = require('./validations/userParams.validation');

const router = Router();

// GET /auth/me
router.get('/me', me);

// POST /auth/register
router.post(
  '/register',
  // validate(RegisterSchema), // default = body
  register
);

// POST /auth/login
router.post('/login',
   validate(LoginSchema), 
   login);

// POST /auth/refresh
router.post('/refresh', refresh);

// POST /auth/logout
router.post('/logout', logout);

// GET /auth/users/:id (ถ้ามี controller)
// router.get(
//   '/users/:id',
//   validateAll({ params: UserIdParamsSchema, query: PaginationQuerySchema }),
//   getUserById // ต้องมี handler ตรงนี้
// );

router.get('/users/:id', validateAll({ params: UserIdParamsSchema, query: PaginationQuerySchema }), (req, res) => {
  const { id } = req.params;
  const { page, limit } = req.query;
  res.send({ id, page, limit });
});

module.exports = router;
