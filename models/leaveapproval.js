'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaveApproval extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LeaveApproval.belongsTo(models.LeaveReport, {foreignKey: 'leaveReportId'})
      LeaveApproval.hasMany(models.LeaveApprovalDetail, {foreignKey: 'leaveApprovalId'})
      // define association here
    }
  }
  LeaveApproval.init({
    leaveReportId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'},
  }, {
    sequelize,
    modelName: 'LeaveApproval',
  });
  return LeaveApproval;
};