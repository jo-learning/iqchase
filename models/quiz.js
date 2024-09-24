// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class quiz extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   quiz.init({
//     question: DataTypes.STRING,
//     quizname_id: DataTypes.INTEGER,
//   }, {
//     sequelize,
//     modelName: 'quiz',
//   });
//   return quiz;
// };



const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Adjust the path as necessary

const quiz = sequelize.define('quizzes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quizname_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  // Additional options can go here
  tableName: 'quizzes', // Specify the table name if different
  timestamps: true, // Enable timestamps if desired
});

module.exports = quiz;
