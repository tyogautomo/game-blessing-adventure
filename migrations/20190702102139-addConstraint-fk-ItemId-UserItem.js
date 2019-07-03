'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserItems', ['ItemId'], {
      type: 'foreign key',
      name: 'ItemId_fk_on_UserItem',
      references: { //Required field
        table: 'Items',
        field: 'id'
      },
      onDelete: 'set null',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeConstraint('UserItems','ItemId_fk_on_UserItem')
  }
};
