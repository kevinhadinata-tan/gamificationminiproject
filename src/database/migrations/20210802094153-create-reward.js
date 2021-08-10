'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Rewards', {
      ID: {
        type: Sequelize.STRING(22),
        primaryKey: true,
        allowNull: false,
      },
      rewardName: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      rewardPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rewardImage: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tierID: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'Tiers',
          key: 'ID',
        }
      },
      isShowReward: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
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
     await queryInterface.dropTable('Rewards');
  }
};
