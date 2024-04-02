'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaveApprovalDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LeaveApprovalDetail.belongsTo(models.LeaveApproval, {foreignKey: 'leaveApprovalId'})
      LeaveApprovalDetail.belongsTo(models.User, {foreignKey: 'userId'})
      // define association here
    }
  }
  LeaveApprovalDetail.init({
    leaveApprovalId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'},
    isActive: {
      type:DataTypes.BOOLEAN,
      defaultValue: true}
  }, {
    sequelize,
    modelName: 'LeaveApprovalDetail',
  });
  return LeaveApprovalDetail;
};