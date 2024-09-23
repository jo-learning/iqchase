'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn('quiznames', 'description', {
      type: Sequelize.TEXT, // revert back if needed
      allowNull: true,
      defaultValue: null,  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('quiznames', 'description');
  },
};
