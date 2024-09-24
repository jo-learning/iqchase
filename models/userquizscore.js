'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userquizscore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userquizscore.init({
    user_id: DataTypes.INTEGER,
    quiz_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userquizscore',
  });
  return userquizscore;
};

const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Adjust the path as necessary

const userScore = sequelize.define('userquizscores', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quiz_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  // Additional options can go here
  tableName: 'userquizscores', // Specify the table name if different
  timestamps: true, // Enable timestamps if desired
});

module.exports = userScore;
