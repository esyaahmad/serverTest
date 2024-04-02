'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.LeaveReport, {foreignKey: 'userId'})
      User.hasOne(models.LeaveBalance, {foreignKey: 'userId'})
      User.hasMany(models.LeaveApprovalDetail, {foreignKey: 'userId'})

      // define association here
    }
  }
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'name cannot be empty'
        },
        notNull : {
          msg : 'name cannot be null'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'password cannot be empty'
        },
        notNull : {
          msg : 'password cannot be null'
        }
      }
    },
    nik: DataTypes.STRING,
    department: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};