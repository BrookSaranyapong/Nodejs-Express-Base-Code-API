exports.JWT_CONST = {
  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access_secret",
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh_secret",
  ACCESS_TTL: process.env.ACCESS_TOKEN_TTL || "15m",
  REFRESH_TTL: process.env.JWT_REFRESH_TTL || "30d",
};
