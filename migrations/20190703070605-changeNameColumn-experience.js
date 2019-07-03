'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.renameColumn('Users', 'experience', 'exp');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'exp', 'experience');
  }
};