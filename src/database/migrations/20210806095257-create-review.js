'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('Reviews', { 
       ID: {
         type: Sequelize.STRING(22),
         primaryKey: true,
         allowNull: false,
       },
       userID: {
        type: Sequelize.STRING(22),
        allowNull: false,
        references: {
          model: 'Users',
          key: 'ID'
        }
       },
       taskID: {
        type: Sequelize.STRING(22),
        allowNull: false,
        references: {
          model: 'Task_Assigned',
          key: 'ID'
        }
       },
       isTaskSuccess: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
       }
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('Reports');
  }
};
