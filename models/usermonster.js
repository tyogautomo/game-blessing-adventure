'use strict';
module.exports = (sequelize, DataTypes) => {
  class UserMonster extends sequelize.Sequelize.Model {
    static associate(models) {
      UserMonster.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
      UserMonster.belongsTo(models.Monster, {
        foreignKey: 'MonsterId'
      })
    }
  }
  UserMonster.init({
    UserId: DataTypes.INTEGER,
    MonsterId: DataTypes.INTEGER,
    userHp: DataTypes.INTEGER,
    monsterHp: DataTypes.INTEGER,
    result: DataTypes.STRING
  }, {
    sequelize
  })

  return UserMonster;
};