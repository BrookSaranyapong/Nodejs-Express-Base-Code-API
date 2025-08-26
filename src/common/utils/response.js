// const { APP_NAME } = require('../constants/config');
const { mapSuccess, mapError } = require('./response-mapper');

class Response {
  static success(res, constant, data = null, status = 200, services = null) {
    return res.status(status).json(mapSuccess(constant, data, services));
  }

  static error(res, constant, status = 500, details = null, services = null) {
    return res.status(status).json(mapError(constant, details, services));
  }
}
module.exports = Response;