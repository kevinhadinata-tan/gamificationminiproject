'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('Reward_Users', {
        ID: {
          type: Sequelize.STRING(22),
          primaryKey: true,
          allowNull: false
        },
        userID: {
          type: Sequelize.STRING(22),
          allowNull: true,
          references: {
            model: 'Users',
            key: 'ID',
          }
        },
        rewardID: {
          type: Sequelize.STRING(22),
          allowNull: true,
          references: {
            model: 'Rewards',
            key: 'ID'
          }
        },
        rewardTakenDate: {
          type: Sequelize.DATE,
          allowNull: true
        },
        isRewardTaken: {
          type: Sequelize.BOOLEAN,
          allowNull: true
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
