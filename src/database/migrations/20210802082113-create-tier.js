'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.createTable('Tiers', {
      ID: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      tierName: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      pointLimit: {
        type: Sequelize.INTEGER,
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
     await queryInterface.dropTable('Tiers');
  }
};
