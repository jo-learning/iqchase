// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class quizoption extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   quizoption.init({
//     quiz_id: DataTypes.INTEGER,
//     option_text: DataTypes.TEXT,
//     is_correct: DataTypes.TEXT
//   }, {
//     sequelize,
//     modelName: 'quizoption',
//   });
//   return quizoption;
// };


const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Adjust the path as necessary

const quizoption = sequelize.define('quizoptions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quiz_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option_text: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  is_correct: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  // Additional options can go here
  tableName: 'quizoptions', // Specify the table name if different
  timestamps: true, // Enable timestamps if desired
});

module.exports = quizoption;
