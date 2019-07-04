'use strict';
module.exports = (sequelize, DataTypes) => {
  class Monster extends sequelize.Sequelize.Model {
    static associate(models) {
      Monster.hasMany(models.UserMonster, {
        foreignKey: 'MonsterId'
      })
    }

    generateExp(){
      let random = 0;
      switch (this.level) {
          case this.level >= 15:
              random = Math.floor(Math.random() * 16) + 50;
          break;
          case this.level >= 10:
              random = Math.floor(Math.random() * 16) + 35;
          break;
          case this.level >= 5:
              random = Math.floor(Math.random() * 16) + 20;
          break;
          case this.level >= 1:
              random = Math.floor(Math.random() * 6) + 15;
          break;
      }
     return random
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