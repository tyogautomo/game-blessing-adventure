const {
    User,
    Monster,
    UserMonster
} = require('../models/index')

class ControllerUserMonster {

    static battleArena(req, res) {
        User.findOne({
                where: {
                    username: req.params.username
                }
            })
            .then(userExist => {
                return Promise.all([userExist, Monster.findByPk(req.params.monsterId)])
            })
            .then(([user, monster]) => {
                // console.log(user, '<<<<<<<<<<<<<<<<<<<<<<<<<')
                let data = {
                    UserId: user.dataValues.id,
                    MonsterId: monster.dataValues.id,
                    userHP: user.dataValues.hp,
                    monsterHP: monster.dataValues.hp,
                    result: 'abandoned'
                }
                return Promise.all([user.dataValues, monster.dataValues, UserMonster.create(data)])
            })
            .then(([user, monster, battle]) => {
                res.render('battle-arena.ejs', {
                    currentUser: user,
                    monster: monster,
                    battle: battle
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static attack(req, res) {
        // console.log(req.params.monsterId, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        let userHP = req.body.userHP
        let userAP = req.body.userAP
        let monsterHP = req.body.monsterHP
        let monsterAP = req.body.monsterAP

        let updateUserHP = userHP - monsterAP
        let updateMonsterHP = monsterHP - userAP

        let attack = {
            userHP: updateUserHP,
            monsterHP: updateMonsterHP
        }
        let userWin = {
            monsterHP: 0,
            userHP: updateUserHP,
            result: 'win'
        }
        let userLose = {
            userHP: 0,
            monsterHP: updateMonsterHP,
            result: 'lose'
        }

        if ((updateUserHP <= 0 && updateMonsterHP <= 0) || updateUserHP <= 0) {
            UserMonster.update(userLose, {
                    where: {
                        id: req.params.battleId
                    }
                })
                .then(() => {
                    return User.findByPk(req.session.currentUser.id)
                })
                .then(userExist => {
                    let currentExp = userExist.dataValues.exp
                    let earnedExp = Math.floor((Math.random() * 6) + 5)
                    let updateExp = currentExp + earnedExp
                    let updateData = {
                        exp: updateExp
                    }
                    return Promise.all([earnedExp, User.update(updateData, {
                        where: {
                            id: req.session.currentUser.id
                        }
                    })])
                })
                .then(([earnedExp]) => {
                    res.render('losing.ejs', {
                        msg: `You are Losing this battle. But still gained ${earnedExp} exp!`
                    })
                })
                .catch(err => [
                    res.send(err)
                ])
        } else if (updateMonsterHP <= 0) {
            UserMonster.update(userWin, {
                    where: {
                        id: req.params.battleId
                    }
                })
                .then(() => {
                    return UserMonster.findByPk(req.params.battleId)
                })
                .then(battleExist => {
                    return Promise.all([battleExist, User.findByPk(req.session.currentUser.id)])
                })
                .then(([battleExist, userExist]) => {
                    return Promise.all([battleExist, userExist, Monster.findByPk(req.params.monsterId)])
                })
                .then(([battleExist, userExist, monster]) => {
                    // console.log(monster, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                    let currentExp = userExist.dataValues.exp
                    let earnedExp = Math.floor((Math.random() * 16) + 10)
                    let updateExp = currentExp + earnedExp
                    let updateData = {
                        exp: updateExp
                    }
                    return Promise.all([battleExist, earnedExp, User.update(updateData, {
                        where: {
                            id: req.session.currentUser.id
                        }
                    })])
                })
                .then(([battleExist, earnedExp]) => {
                    res.render('result.ejs', {
                        battle: battleExist.dataValues,
                        msg: `Congratulation, ${req.session.currentUser.username}. You win this battle and gained ${earnedExp} exp!`
                    })

                })
                .catch(err => [
                    res.send(err)
                ])
        } else {
            UserMonster.update(attack, {
                    where: {
                        id: req.params.battleId
                    }
                })
                .then(() => {
                    res.redirect(`/dungeon/${req.session.currentUser.id}/${req.body.name}/${req.params.battleId}`)
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static nextArena(req, res) {
        UserMonster.findByPk(req.params.battleId)
            .then(battle => {
                return Promise.all([battle, Monster.findByPk(battle.dataValues.MonsterId)])
            })
            .then(([battle, monster]) => {
                return Promise.all([User.findByPk(battle.dataValues.UserId), monster, battle])
            })
            .then(([user, monster, battle]) => {
                res.render('battle-arena.ejs', {
                    currentUser: user,
                    monster: monster,
                    battle: battle
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerUserMonster;