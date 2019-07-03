'use strict';
module.exports = (sequelize, DataTypes) => {
  class Monster extends sequelize.Sequelize.Model {
    static associate(models) {
      Monster.hasMany(models.UserMonster, {
        foreignKey: 'MonsterId'
      })
    }
  }
  Monster.init({
    name: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    ap: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize
  })

  return Monster;
};