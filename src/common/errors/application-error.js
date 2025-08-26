const { ERROR } = require('../constants/responses/error-message');

const { INTERNAL_SERVER_500: errors } = ERROR[500];

module.exports = class ApplicationError extends Error {
  constructor(error = errors, detail) {
    super(error.MESSAGE_EN, error.MESSAGE_TH);
    this.http = error.HTTP;
    this.code = error.CODE;
    this.message_th = error.MESSAGE_TH;
    this.message_en = error.MESSAGE_EN;
    this.detail = detail;
  }
};
