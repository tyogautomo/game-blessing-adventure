'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('UserMonsters', 'userHp', 'userHP');
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.renameColumn('UserMonsters', 'userHP', 'userHp');
  }
};