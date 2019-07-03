'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      User.hasMany(models.UserMonster, {
        foreignKey: 'UserId'
      })
      User.hasMany(models.UserItem, {
        foreignKey: 'UserId'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    ap: DataTypes.INTEGER,
    balance: DataTypes.INTEGER,
    experience: DataTypes.INTEGER
  }, {
    sequelize
  })

  return User;
};