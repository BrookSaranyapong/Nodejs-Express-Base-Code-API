const { mapSuccess, mapError } = require('./response-map');

class Response {
  static success(res, constant, data = null, httpStatus = 200, services = null, pagination = null) {
    return res.status(httpStatus).json(mapSuccess(constant, data, services, pagination));
  }

  static error(res, constant, httpStatus = 500, details = null, services = null) {
    return res.status(httpStatus).json(mapError(constant, details, services));
  }
}

module.exports = Response;
