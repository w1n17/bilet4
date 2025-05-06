module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Rental", {
    endDate: DataTypes.DATE,
  });
};
