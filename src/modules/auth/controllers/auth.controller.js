// src/modules/auth/controllers/auth.controller.js
const Response = require("../../../common/utils/response");
const { HttpStatus } = require("../../../common/constants/statusCode");
const {
  SUCCESS,
} = require("../../../common/constants/responses/success-message");
const AuthService = require("../services/auth.service");

class AuthController {
  // POST /auth/register
  async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);

      return Response.success(
        res,
        SUCCESS[201].SUCCESS_RESPONSE,
        user,
        HttpStatus.CREATED
      );
    } catch (err) {
      next(err);
    }
  }

  // POST /auth/login
  async login(req, res, next) {
    try {
      const data = await AuthService.login(req.body);

      return Response.success(
        res,
        SUCCESS[200].SUCCESS_RESPONSE,
        data,
        HttpStatus.OK
      );
    } catch (err) {
      next(err);
    }
  }

  // POST /auth/refresh
  async refresh(req, res, next) {
    try {
      const tokens = await AuthService.refresh(req.body);

      return Response.success(
        res,
        SUCCESS[200].SUCCESS_RESPONSE,
        tokens,
        HttpStatus.OK
      );
    } catch (err) {
      next(err);
    }
  }

  // POST /auth/logout
  async logout(req, res, next) {
    try {
      await AuthService.logout(req.body);

      return Response.success(
        res,
        SUCCESS[200].SUCCESS_RESPONSE,
        { ok: true },
        HttpStatus.OK
      );
    } catch (err) {
      next(err);
    }
  }

  // POST /auth/logout-all (ต้องมี requireAuth set req.user)
  async logoutAll(req, res, next) {
    try {
      await AuthService.logoutAll(req.user.id);
      return Response.success(
        res,
        SUCCESS[200].SUCCESS_RESPONSE,
        { ok: true },
        HttpStatus.OK
      );
    } catch (err) {
      next(err);
    }
  }

  // GET /auth/me (ต้องมี requireAuth set req.user)
  async me(req, res) {
    return Response.success(
      res,
      SUCCESS[200].SUCCESS_RESPONSE,
      { user: req.user },
      HttpStatus.OK
    );
  }
}

module.exports = new AuthController();
