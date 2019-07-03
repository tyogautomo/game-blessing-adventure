'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserItems', ['UserId'], {
      type: 'foreign key',
      name: 'UserId_fk_on_UserItem',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'set null',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeConstraint('UserItems','UserId_fk_on_UserItem')
  }
};
