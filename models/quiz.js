'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  quiz.init({
    question: DataTypes.STRING,
    quizname_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'quiz',
  });
  return quiz;
};