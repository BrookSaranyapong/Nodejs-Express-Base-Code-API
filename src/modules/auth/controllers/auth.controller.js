const Response = require('../../../common/utils/response-utils');
const { HttpStatus } = require('../../../common/constants/statusCode');
const { SUCCESS } = require('../../../common/constants/responses/success-message');
const AuthService = require('../services/auth.service');

class AuthController {
  // POST /auth/register
  async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);
      return Response.success(res, SUCCESS[201].SUCCESS_RESPONSE_201, user, HttpStatus.CREATED);
    } catch (err) {
      next(err);
    }
  }

  // POST /auth/login
  async login(req, res, next) {
    try {
      const data = await AuthService.login(req.body);
      return Response.success(res, SUCCESS[200].LOGIN_SUCCESS_200, data, HttpStatus.OK);
    } catch (err) {
      next(err);
    }
  }

  // POST /auth/refresh
  async refresh(req, res, next) {
    try {
      const tokens = await AuthService.refresh(req.body);
      return Response.success(res, SUCCESS[200].REFRESH_SUCCESS_200, tokens, HttpStatus.OK);
    } catch (err) {
      next(err);
    }
  }

  // POST /auth/logout
  async logout(req, res, next) {
    try {
      await AuthService.logout(req.body);
      return Response.success(res, SUCCESS[200].LOGOUT_SUCCESS_200, { ok: true }, HttpStatus.OK);
    } catch (err) {
      next(err);
    }
  }

  // GET /auth/me (ต้องมี requireAuth set req.user)
  async me(req, res) {
    return Response.success(res, SUCCESS[200].SUCCESS_RESPONSE_200, { user: req.user }, HttpStatus.OK);
  }
}

module.exports = new AuthController();
