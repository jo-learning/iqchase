// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class quizname extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   quizname.init(
//     {
//       name: DataTypes.STRING,
//       time: DataTypes.INTEGER,
//       image: DataTypes.STRING,
//       success: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },
//       description: {
//         type: DataTypes.TEXT,
//         defaultValue: "",
//       },
//     },
//     {
//       sequelize,
//       modelName: "quizname",
//     }
//   );
//   return quizname;
// };

const { DataTypes } = require("sequelize");
const sequelize = require("./index"); // Adjust the path as necessary

const quizname = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    success: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
  },
  {
    // Additional options can go here
    tableName: "quiznames", // Specify the table name if different
    timestamps: true, // Enable timestamps if desired
  }
);

module.exports = quizname;
