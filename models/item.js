'use strict';
module.exports = (sequelize, DataTypes) => {
  class Item extends sequelize.Sequelize.Model {
    static associate(models) {
      Item.hasMany(models.UserItem, {
        foreignKey: 'ItemId'
      })
    }
  }
  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
    effect: DataTypes.INTEGER
  }, {
    sequelize
  })
  return Item;
};