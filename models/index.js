const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

// Импорт моделей
const User = require("./user");
const Server = require("./server");
const Rental = require("./rental");

// Инициализация моделей
const models = {
  User: User(sequelize, DataTypes),
  Server: Server(sequelize, DataTypes),
  Rental: Rental(sequelize, DataTypes),
};

// Установка связей
models.User.hasMany(models.Rental);
models.Server.hasMany(models.Rental);
models.Rental.belongsTo(models.User);
models.Rental.belongsTo(models.Server);

module.exports = {
  sequelize,
  ...models,
};
