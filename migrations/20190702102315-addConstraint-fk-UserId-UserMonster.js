'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserMonsters', ['UserId'], {
      type: 'foreign key',
      name: 'UserId_fk_on_UserMonster',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'set null',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeConstraint('UserMonsters','UserId_fk_on_UserMonster')
  }
};
