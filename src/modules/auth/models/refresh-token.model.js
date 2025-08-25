const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../../configs/db")


class RefreshToken extends Model {}
RefreshToken.init(
  {
    tokenHash: { type: DataTypes.STRING, allowNull: false },
    jti: { type: DataTypes.STRING, allowNull: false, unique: true },
    userAgent: { type: DataTypes.STRING },
    ip: { type: DataTypes.STRING },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
    revokedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "RefreshToken",
    tableName: "refresh_tokens",
    timestamps: true,
  }
);

module.exports = RefreshToken;
