const ApplicationError = require('./application-error');
const { ERROR } = require('../constants/responses/error-message');

const HANDLERS = {
  ZodError: (err) => {
    const details = (err.issues || []).map((i) => ({
      path: i.path,
      message: i.message,
      code: i.code,
    }));
    return new ApplicationError({
      http: ERROR[400].CLIENT_ERROR_400.HTTP,
      code: ERROR[400].CLIENT_ERROR_400.CODE,
      message_th: ERROR[400].CLIENT_ERROR_400.MESSAGE_TH,
      message_en: ERROR[400].CLIENT_ERROR_400.MESSAGE_EN,
      details,
    });
  },

  JsonWebTokenError: (err) =>
    new ApplicationError({
      http: (ERROR[401] && ERROR[401].UNAUTHORIZED_ERROR_401.HTTP) || ERROR[400].CLIENT_ERROR_400.HTTP,
      code: (ERROR[401] && ERROR[401].UNAUTHORIZED_ERROR_401.CODE) || ERROR[400].CLIENT_ERROR_400.CODE,
      message_th: (ERROR[401] && ERROR[401].UNAUTHORIZED_ERROR_401.MESSAGE_TH) || ERROR[400].CLIENT_ERROR_400.MESSAGE_TH,
      message_en: (ERROR[401] && ERROR[401].UNAUTHORIZED_ERROR_401.MESSAGE_EN) || ERROR[400].CLIENT_ERROR_400.MESSAGE_EN,
      details: { reason: err.message },
    }),

  TokenExpiredError: (err) =>
    new ApplicationError({
      http: ERROR[401].UNAUTHORIZED_ERROR_401.HTTP,
      code: ERROR[401].UNAUTHORIZED_ERROR_401.CODE,
      message_th: ERROR[401].UNAUTHORIZED_ERROR_401.MESSAGE_TH,
      message_en: ERROR[401].UNAUTHORIZED_ERROR_401.MESSAGE_EN,
      details: { expiredAt: err.expiredAt },
    }),

  SequelizeValidationError: (err) => {
    const details = (err.errors || []).map((e) => ({ path: e.path, message: e.message }));
    return new ApplicationError({
      http: ERROR[400].CLIENT_ERROR_400.HTTP,
      code: ERROR[400].CLIENT_ERROR_400.CODE,
      message_th: ERROR[400].CLIENT_ERROR_400.MESSAGE_TH,
      message_en: ERROR[400].CLIENT_ERROR_400.MESSAGE_EN,
      details,
    });
  },

  SequelizeUniqueConstraintError: (err) => {
    const details = (err.errors || []).map((e) => ({ path: e.path, message: e.message }));
    return new ApplicationError({
      http: ERROR[400].CLIENT_ERROR_400.HTTP,
      code: ERROR[400].CLIENT_ERROR_400.CODE,
      message_th: ERROR[400].CLIENT_ERROR_400.MESSAGE_TH,
      message_en: ERROR[400].CLIENT_ERROR_400.MESSAGE_EN,
      details,
    });
  },

  MulterError: (err) =>
    new ApplicationError({
      http: ERROR[400].CLIENT_ERROR_400.HTTP,
      code: ERROR[400].CLIENT_ERROR_400.CODE,
      message_th: ERROR[400].CLIENT_ERROR_400.MESSAGE_TH,
      message_en: ERROR[400].CLIENT_ERROR_400.MESSAGE_EN,
      details: { field: err.field, code: err.code },
    }),
};

module.exports = HANDLERS;
