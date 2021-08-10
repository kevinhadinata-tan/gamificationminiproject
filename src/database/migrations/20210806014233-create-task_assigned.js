'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('Task_Assigned', {
      ID: {
        type: Sequelize.STRING(22),
        primaryKey: true,
        allowNull: false
      },
      userID: {
        type: Sequelize.STRING(22),
        references: {
          model: 'Users',
          key: 'ID',
        }
      },
      taskID: {
        type: Sequelize.STRING(22),
        references: {
          model: 'Tasks',
          key: 'ID'
        }
      },
      isTaskCompleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
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
  }
};
