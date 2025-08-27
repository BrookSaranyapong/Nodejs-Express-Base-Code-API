const Response = require('../utils/response-utils');
const { errorHandlerUtils } = require('../utils/error-handler-utils');

module.exports = function errorHandler(err, req, res, next) {
  const appErr = errorHandlerUtils(err);

  if (process.env.NODE_ENV !== 'production') {
    console.error('[ErrorHandler]', {
      name: err?.name,
      message: err?.message,
      http: appErr.http,
      code: appErr.code,
      details: appErr.details,
      stack: err?.stack,
    });
  }

  return Response.error(
    res,
    {
      HTTP: appErr.http,
      CODE: appErr.code,
      MESSAGE_TH: appErr.message_th,
      MESSAGE_EN: appErr.message_en,
    },
    appErr.http,
    appErr.details
  );
};
