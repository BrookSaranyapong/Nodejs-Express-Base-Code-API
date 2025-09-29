const responseBuilder = require('../../../common/utils/response-builder');
const AuthService = require('../services/auth.service');

class AuthController {
  constructor() {
    this.response = responseBuilder;
    this.authService = AuthService;
  }

  // POST /auth/register
  register = async (req, res, next) => {
    try {
      // const user = await this.authService.register(req.body);
      return this.response.ResponseSuccessWithData(res, { data: 'user' });
    } catch (err) {
      next(err);
    }
  };

  // POST /auth/login
  login = async (req, res, next) => {
    try {
      const data = await this.authService.login(req.body);
      return this.response.ResponseSuccessWithData(res, data);
    } catch (err) {
      next(err);
    }
  };

  // POST /auth/refresh
  refresh = async (req, res, next) => {
    try {
      const tokens = await this.authService.refresh(req.body);
      return this.response.ResponseSuccessWithData(res, tokens);
    } catch (err) {
      next(err);
    }
  };

  // POST /auth/logout
  logout = async (req, res, next) => {
    try {
      await this.authService.logout(req.body);
      return this.response.ResponseSuccessWithData(res, { ok: true });
    } catch (err) {
      next(err);
    }
  };

  // GET /auth/me
  me = async (req, res, next) => {
    try {
      const user = {name: "BrookSaranyapong Testing"}
      return this.response.ResponseSuccessWithData(res, user);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new AuthController();
