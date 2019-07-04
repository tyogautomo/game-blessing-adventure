'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('UserMonsters', 'monsterHp', 'monsterHP');
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.renameColumn('UserMonsters', 'monsterHP', 'monsterHp');
  }
};