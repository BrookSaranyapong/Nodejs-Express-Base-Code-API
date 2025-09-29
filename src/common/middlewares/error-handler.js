const { ERROR_MESSAGE } = require('../constants/responses/error-message');
const ApplicationError = require('../errors/application-error');

module.exports = function errorHandler(err, req, res, next) {
  try {
    if (err instanceof ApplicationError) {
      return next(err);
    }
    const applicationError = new ApplicationError(ERROR_MESSAGE.INTERNAL_SERVER_500, err);
    return next(applicationError);
  } catch (error) {
    const fallbackError = new ApplicationError(ERROR_MESSAGE.INTERNAL_SERVER_500, error);
    return next(fallbackError);
  }
};
