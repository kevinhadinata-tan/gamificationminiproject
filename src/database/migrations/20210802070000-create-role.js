'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('Roles',{
        ID: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false
        },
        role: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
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
    await queryInterface.dropTable('Roles');
  }
};
