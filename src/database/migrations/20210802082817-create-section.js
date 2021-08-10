'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Sections', {
      ID: {
        type: Sequelize.STRING(22),
        primaryKey: true,
        allowNull: false
      },
      sectionName: {
        type: Sequelize.STRING(40),
        allowNull: true
      },
      workspaceID: {
        type: Sequelize.STRING(22),
        allowNull: true,
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
     await queryInterface.dropTable('Sections');
  }
};
