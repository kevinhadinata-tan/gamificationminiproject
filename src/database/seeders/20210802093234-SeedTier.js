'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Tiers', [
     {
        ID: 1,
        tierName: 'Bronze',
        pointLimit: 50,
     },
     {
        ID: 2,
        tierName: 'Silver',
        pointLimit: 80,
     },
     {
        ID: 3,
        tierName: 'Gold',
        pointLimit: 100,
     }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
