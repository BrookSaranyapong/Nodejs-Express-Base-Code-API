const { CONFIG: { APP_NAME, SERVICE_NAME } } = require('../constants/config');

const composeService = (suffix) => (suffix ? `${SERVICE_NAME} ${suffix}` : SERVICE_NAME);

// SUCCESS
function mapSuccess(constant, data = null, serviceSuffix = null, pagination = null) {
  return {
    success: true,
    status: {
      code: constant.CODE,
      message: {
        TH: constant.MESSAGE_TH,
        EN: constant.MESSAGE_EN,
      },
      ...(constant.created_at ? { created_at: constant.created_at } : {}),
    },
    ...(pagination
      ? {
          data: {
            result: data ?? [],
            page: pagination.page,
            limit: pagination.limit,
            total: pagination.total,
          },
        }
      : data !== null && data !== undefined
      ? { data }
      : {}),
    service: {
      app_name: APP_NAME,
      core_services: composeService(serviceSuffix),
    },
  };
}

// ERROR
function mapError(constant, details = null, serviceSuffix = null) {
  return {
    success: false,
    status: {
      code: constant.CODE,
      message: {
        TH: constant.MESSAGE_TH,
        EN: constant.MESSAGE_EN,
      },
      ...(details ? { details } : {}),
    },
    service: {
      app_name: APP_NAME,
      core_services: composeService(serviceSuffix),
    },
  };
}

module.exports = { mapSuccess, mapError };
