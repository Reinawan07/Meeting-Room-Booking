'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      room.hasMany(models.roomUsage, {foreignKey: 'roomId'})
    }
  }
  room.init({
    roomName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Room name is required'
        },
        notEmpty: {
          msg: 'Room name is required'
        }
      }
    },
    costPerHour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Cost per hour is required'
        },
        notEmpty: {
          msg: 'Cost per hour is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};