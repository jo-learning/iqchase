'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quizname extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  quizname.init({
    name: DataTypes.STRING,
    time: DataTypes.INTEGER,
    image: DataTypes.STRING,
    success: {
      type: DataTypes.BOOLEAN,
    defaultValue: false
    },
    description: {
      type:DataTypes.TEXT,
    defaultValue: ""}
  }, {
    sequelize,
    modelName: 'quizname',
  });
  return quizname;
};