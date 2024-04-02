'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaveReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LeaveReport.belongsTo(models.User, {foreignKey: 'userId'})
      LeaveReport.belongsTo(models.LeaveApproval, {foreignKey: 'leaveReportId'})
      // define association here
    }
  }
  LeaveReport.init({
    userId: DataTypes.INTEGER,
    startDate: {
      type:DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'start date cannot be empty'
        },
        notNull : {
          msg : 'start date cannot be null'
        }
      }
    },
    endDate: {
      type:DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'end date cannot be empty'
        },
        notNull : {
          msg : 'end date cannot be null'
        }
      }
    },
    total: DataTypes.INTEGER,
    description: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'description cannot be empty'
        },
        notNull : {
          msg : 'description cannot be null'
        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LeaveReport',
  });
  return LeaveReport;
};