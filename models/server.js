module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Server", {
    game: DataTypes.STRING,
    slots: DataTypes.INTEGER,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
