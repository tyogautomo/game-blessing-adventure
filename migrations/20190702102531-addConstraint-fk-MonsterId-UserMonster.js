'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserMonsters', ['MonsterId'], {
      type: 'foreign key',
      name: 'MonsterId_fk_on_UserMonster',
      references: { //Required field
        table: 'Monsters',
        field: 'id'
      },
      onDelete: 'set null',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeConstraint('UserMonsters','MonsterId_fk_on_UserMonster')
  }
};
