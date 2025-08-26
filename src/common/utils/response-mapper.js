const { APP_NAME, DEFAULT_SERVICE } = require('../constants/config');

const composeService = (suffix) => (suffix ? `${DEFAULT_SERVICE} ${suffix}` : DEFAULT_SERVICE);

exports.mapSuccess = (constant, data = null, service = null) => ({
  status: {
    code: constant.CODE,
    message: {
      message_th: constant.MESSAGE_TH,
      message_en: constant.MESSAGE_EN,
    },
  },
  result: {
    data,
  },
  services: {
    app_name: APP_NAME,
    core_serivces: composeService(service),
  },
});

exports.mapError = (constant, details = null, service = null) => ({
  status: {
    code: constant.CODE,
    message: {
      message_th: constant.MESSAGE_TH,
      message_en: constant.MESSAGE_EN,
    },
  },
  ...(details ? { details } : {}),
  services: {
    app_name: APP_NAME,
    core_serivces: composeService(service),
  },
});
