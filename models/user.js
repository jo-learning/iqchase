// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class user extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   user.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     provider: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'user',
//   });
//   return user;
// };



const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Adjust the path as necessary

const user = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Additional options can go here
  tableName: 'users', // Specify the table name if different
  timestamps: true, // Enable timestamps if desired
});

module.exports = user;
