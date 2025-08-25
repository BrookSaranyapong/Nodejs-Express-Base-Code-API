// const { APP_NAME } = require("../config");

class Response {
  static success(res, constant, data = null, status = 200) {
    return res.status(status).json({
      status: {
        success: true,
        code: constant.CODE,
      },
      message: {
        message_th: constant.MESSAGE_TH,
        message_en: constant.MESSAGE_EN,
      },
      service: APP_NAME | 'jwt-backend',
      result: {
        data,
      },
    });
  }

  static error(res, constant, status = 500) {
    return res.status(status).json({
      status: {
        success: false,
        code: constant.CODE,
        message: {
          message_th: constant.MESSAGE_TH,
          message_en: constant.MESSAGE_EN,
        },
      },
      service: APP_NAME | 'jwt-backend',
    });
  }
}

module.exports = Response;
