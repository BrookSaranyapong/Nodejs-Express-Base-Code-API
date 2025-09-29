const { CONFIG } = require('../constants/config');
const { ERROR_MESSAGE } = require('../constants/responses/error-message');
const { MESSAGE } = require('../constants/responses/success-message');
const ApplicationError = require('../errors/application-error');
const { _getSafeObject } = require('./safe-object');

class ResponseBuilder {
  constructor() {
    this.successMessage = MESSAGE.SUCCESS_RESPONSE_200;
    this.appName = CONFIG.APP_NAME;
    this.internalError = ERROR_MESSAGE.INTERNAL_SERVER_500;
  }

  ResponseSuccess(res) {
    return res.status(this.successMessage.HTTP).send({
      status: {
        code: this.successMessage.CODE,
        message: {
          TH: this.successMessage.MESSAGE_TH,
          EN: this.successMessage.MESSAGE_EN,
        },
      },
      service: this.appName,
    });
  }

  ResponseSuccessWithData(res, data) {
    return res.status(this.successMessage.HTTP).send({
      status: {
        code: this.successMessage.CODE,
        message: {
          TH: this.successMessage.MESSAGE_TH,
          EN: this.successMessage.MESSAGE_EN,
        },
      },
      result: { data },
      service: this.appName,
    });
  }

  ResponseSuccessWithDataPaginate(res, data, pagination = { page: 1, limit: 10 }) {
    return res.status(this.successMessage.HTTP).send({
      status: {
        code: this.successMessage.CODE,
        message: {
          TH: this.successMessage.MESSAGE_TH,
          EN: this.successMessage.MESSAGE_EN,
        },
      },
      result: data,
      pagination,
      service: this.appName,
    });
  }

  ErrorBuilder(res, err) {
    if (err instanceof ApplicationError) {
      return res.status(err.http).send({
        status: {
          code: err.code,
          message: {
            TH: err.message_th,
            EN: err.message_en,
          },
          errors: _getSafeObject(() => err.detail.errors, err.detail),
        },
      });
    }

    return res.status(this.internalError.HTTP).send({
      status: {
        code: this.internalError.CODE,
        message: {
          TH: this.internalError.MESSAGE_TH,
          EN: this.internalError.MESSAGE_EN,
        },
        errors: err,
      },
    });
  }
}

module.exports = new ResponseBuilder();
