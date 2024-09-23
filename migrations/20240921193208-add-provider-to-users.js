'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding the 'provider' column to the 'users' table
    await queryInterface.addColumn('users', 'provider', {
      type: Sequelize.STRING, // or Sequelize.TEXT if you need larger strings
      allowNull: false,       // Adjust based on your requirements
      defaultValue: 'local',  // Set a default value if needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Removing the 'provider' column in case of a rollback
    await queryInterface.removeColumn('users', 'provider');
  }
};
