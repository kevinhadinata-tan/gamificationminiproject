'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Histories', {
      ID: {
        type: Sequelize.STRING(22),
        primaryKey: true,
        allowNull: false,
      },
      taskID: {
        type: Sequelize.STRING(22),
        allowNull: true,
        references: {
          model: 'Task_Assigned',
          key: 'ID'
        }
      },
      userID: {
        type: Sequelize.STRING(22),
        allowNull: true,
        references: {
          model: 'Users',
          key: 'ID'
        }
      },
      rewardID: {
        type: Sequelize.STRING(22),
        allowNull: true,
        references: {
          model: 'Reward_Users',
          key: 'ID'
        }
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
     await queryInterface.dropTable('Histories');
  }
};
