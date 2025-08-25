const {Router } = require('express');
const { validate } = require('../../common/middlewares/validate');
const { RegisterSchema } = require('./validation/register.validation');
const { UserIdParamsSchema } = require('./validation/userParams.validation');
const { PaginationQuerySchema } = require('./validation/pagination.validation');

const router = Router()

router.post(
  "/register",
  validate(RegisterSchema), // default = body
  ctrl.register
);

router.post("/login", validate(LoginSchema), ctrl.login);

router.get(
  "/users/:id",
  validateAll({ params: UserIdParamsSchema, query: PaginationQuerySchema }),
);

module.exports = router;

