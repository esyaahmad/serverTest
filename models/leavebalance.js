'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaveBalance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LeaveBalance.belongsTo(models.User, {foreignKey: 'userId'})
      // define association here
    }
  }
  LeaveBalance.init({
    userId: DataTypes.INTEGER,
    value: {
      type:DataTypes.INTEGER,
      defaultValue: 12
  }
  }, {
    sequelize,
    modelName: 'LeaveBalance',
  });
  return LeaveBalance;
};