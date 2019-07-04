'use strict';
module.exports = (sequelize, DataTypes) => {
  class Monster extends sequelize.Sequelize.Model {
    static associate(models) {
      Monster.hasMany(models.UserMonster, {
        foreignKey: 'MonsterId'
      })
    }

    generateExp() {
      let random = 0;
      console.log(this.level, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
      if (this.level >= 15) {
        random = Math.floor(Math.random() * 16) + 50;
      } else if (this.level >= 10) {
        random = Math.floor(Math.random() * 16) + 35;
      } else if (this.leve >= 5) {
        random = Math.floor(Math.random() * 16) + 20;
      } else if (this.level >= 1) {
        random = Math.floor(Math.random() * 6) + 15;
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