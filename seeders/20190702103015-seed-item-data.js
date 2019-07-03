'use strict';

const fs = require('fs')
const items = fs.readFileSync('items.csv','utf8').split('\n')
let result = []
items.forEach(item => {
  result.push({
   name : item.split(',')[0],
   effect: item.split(',')[3],
   type : item.split(',')[2],
   price : item.split(',')[1],
   createdAt : new Date(),
   updatedAt : new Date()
  })
})
console.log(result)
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items',result,{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items',null,{})
  }
};
