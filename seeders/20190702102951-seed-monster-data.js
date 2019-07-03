'use strict';

const fs = require('fs')
const monsters = fs.readFileSync('monsters.csv','utf8').split('\n')
let result = []
monsters.forEach(monster => {
  result.push({
   name : monster.split(',')[0],
   hp: monster.split(',')[1],
   ap : monster.split(',')[2],
   level : monster.split(',')[3],
   image : null,
   createdAt : new Date(),
   updatedAt : new Date()
  })
})
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Monsters',result,{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Monsters',null,{})
  }
};
