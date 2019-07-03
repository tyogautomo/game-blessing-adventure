'use strict';

let bcrypt = require('bcryptjs')

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

  User.addHook('beforeCreate', 'encryptPassword', (user, option) => {

    var salt = bcrypt.genSaltSync(10);
    user.password = `${user.password}`
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  })

  return User;
};