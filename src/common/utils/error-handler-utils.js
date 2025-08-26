const ApplicationError = require('./application-error');
const { ERROR } = require('../constants/responses/error-message');
const HANDLERS = require('../errors/error-map');

function normalize(err) {
  if (err instanceof ApplicationError) return err;

  const handler = HANDLERS[err?.name];
  if (handler) return handler(err);

  return new ApplicationError({
    http: ERROR[500].INTERNAL_SERVER_500.HTTP,
    code: ERROR[500].INTERNAL_SERVER_500.CODE,
    message_th: ERROR[500].INTERNAL_SERVER_500.MESSAGE_TH,
    message_en: ERROR[500].INTERNAL_SERVER_500.MESSAGE_EN,
    details: null,
    cause: err,
  });
}

module.exports = { normalize };
