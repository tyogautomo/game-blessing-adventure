'use strict';
module.exports = (sequelize, DataTypes) => {
  class UserItem extends sequelize.Sequelize.Model {
    static associate(models) {
      UserItem.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
      UserItem.belongsTo(models.Item, {
        foreignKey: 'ItemId'
      })
    }
  }
  UserItem.init({
    UserId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER
  }, {
    sequelize
  })
  
  return UserItem;
};