'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Workspace_Users', {
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
      workspaceID: {
        type: Sequelize.STRING(22),
        references: {
          model: 'Workspaces',
          key: 'ID'
        }
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
