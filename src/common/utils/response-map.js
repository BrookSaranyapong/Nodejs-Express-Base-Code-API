const { APP_NAME, DEFAULT_SERVICE } = require('../constants/config');

const composeService = (suffix) => (suffix ? `${DEFAULT_SERVICE} ${suffix}` : DEFAULT_SERVICE);

function buildResponse({ success, constant, data = null, pagination = null, details = null, serviceSuffix = null }) {
  return {
    success,
    status: {
      code: constant.CODE,
      message: {
        TH: constant.MESSAGE_TH,
        EN: constant.MESSAGE_EN,
      },
      ...(!success && details ? { details } : {}),
    },
    ...(pagination
      ? { data: { result: data ?? [], page: pagination.page, limit: pagination.limit, total: pagination.total } }
      : data !== null && data !== undefined
      ? { data }
      : {}),
    service: {
      app_name: APP_NAME,
      core_services: composeService(serviceSuffix),
    },
  };
}

exports.mapSuccess = (constant, data = null, serviceSuffix = null, pagination = null) =>
  buildResponse({ success: true, constant, data, pagination, serviceSuffix });

exports.mapError = (constant, details = null, serviceSuffix = null) =>
  buildResponse({ success: false, constant, details, serviceSuffix });
