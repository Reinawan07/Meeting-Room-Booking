'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roomUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roomUsage.belongsTo(models.client, {foreignKey: 'clientId',});
      roomUsage.belongsTo(models.room, {foreignKey: 'roomId',});
    }
  }
  roomUsage.init({
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Client id is required'
        },
        notEmpty: {
          msg: 'Client id is required'
        }
      },
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Room id is required'
        },
        notEmpty: {
          msg: 'Room id is required'
        },
      },
      references: {
        model: 'rooms',
        key: 'id'
      }
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Start time is required'
        },
        notEmpty: {
          msg: 'Start time is required'
        }
      }
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'End time is required'
        },
        notEmpty: {
          msg: 'End time is required'
        }
      }
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Booking date is required'
        },
        notEmpty: {
          msg: 'Booking date is required'
        }
      }
    },
    quotaUsed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Quota used is required'
        },
        notEmpty: {
          msg: 'Quota used is required'
        }
      }
      },
  }, {
    sequelize,
    modelName: 'roomUsage',
  });
  return roomUsage;
};