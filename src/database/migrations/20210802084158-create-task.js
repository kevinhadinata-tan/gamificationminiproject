'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('Tasks', {
      ID: {
        type: Sequelize.STRING(22),
        primaryKey: true,
        allowNull: false
      },
      taskName: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      taskDetail: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      point: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      taskDateStart: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      taskDateEnd: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      priorityID: {
        type: Sequelize.STRING(22),
        allowNull: true,
        references: {
          model: 'Priorities',
          key: 'ID'
        }
      },
      sectionID: {
        type: Sequelize.STRING(22),
        allowNull: true,
        references: {
          model: 'Sections',
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
      },
      isTaskDone: {
        type: Sequelize.BOOLEAN,
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
     await queryInterface.dropTable('Tasks');
  }
};
