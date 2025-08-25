// modules/auth/models/user.model.js
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../../configs/db");

class User extends Model {}
User.init(
  {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "User", tableName: "users", timestamps: true }
);

module.exports = User;
