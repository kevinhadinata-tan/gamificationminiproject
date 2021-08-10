'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('Users', {
      ID: {
        type: Sequelize.STRING(22),
        primaryKey: true,
        allowNull: false
      },
      firstname: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      lastname: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      tierID: {
        type: Sequelize.STRING(22),
        allowNull: true,
        references: {
          model: 'Tiers',
          key: 'ID'
        }
      },
      roleID: {
        allowNull: false,
        type: Sequelize.STRING(22),
        references: {
          model: 'Roles',
          key: 'ID',
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
     await queryInterface.dropTable('Users');
  }
};
