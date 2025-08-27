exports.CONFIG = {
  APP_NAME: process.env.APP_NAME,
  SERVICE_NAME: process.env.SERVICE_NAME,
  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  ACCESS_TTL: process.env.ACCESS_TOKEN_TTL,
  REFRESH_TTL: process.env.JWT_REFRESH_TTL,
  PORT: process.env.PORT,
};
