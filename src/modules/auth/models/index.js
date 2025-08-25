const { sequelize } = require("../../../configs/db");
const User = require("./user.model");
const RefreshToken = require("./refresh-token.model");

User.hasMany(RefreshToken, { foreignKey: "userId", as: "refreshTokens" });
RefreshToken.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = { sequelize, User, RefreshToken };
