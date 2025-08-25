const Response = require('../utils/response');
const { HttpStatus } = require('../constants/statusCode');
const { ERROR } = require('../constants/responses/error-message');

const ApplicationError = require('../errors/application-error');

module.exports = function errorHandler(err, req, res, _next) {
  const { INTERNAL_SERVER_ERROR: FALLBACK } = ERROR[500];

  // dev-only logging
  if (process.env.NODE_ENV !== 'production') {
    console.error('[ErrorHandler]', {
      name: err?.name,
      message: err?.message,
      http: err?.http || err?.status || err?.statusCode,
      code: err?.code,
      details: err?.details,
      stack: err?.stack,
    });
  }

  if (err instanceof ApplicationError) {
    const http = err.http ?? HttpStatus.INTERNAL_SERVER_ERROR;
    return Response.error(res, err.constant, http, err.details);
  }

  if (err?.name === 'ZodError') {
    const details = (err.issues || []).map((i) => ({
      path: i.path,
      message: i.message,
      code: i.code,
    }));
    return Response.error(res, ERROR[400].CLIENT_ERROR, HttpStatus.BAD_REQUEST, details);
  }

  return Response.error(res, FALLBACK, FALLBACK.HTTP);
};
