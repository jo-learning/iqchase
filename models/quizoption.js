'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quizoption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  quizoption.init({
    quiz_id: DataTypes.INTEGER,
    option_text: DataTypes.STRING,
    is_correct: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'quizoption',
  });
  return quizoption;
};