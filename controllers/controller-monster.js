const {
    User,
    Monster,
    UserMonster
} = require('../models/index')
const Op = require('sequelize').Op

class ControllerMonster {
    static getAll(req, res) {
        Monster.findAll({
                order: ["id"]
            })
            .then(monsters => {
                res.render('monsters.ejs', {
                    monsters
                })
            })
            .catch(err => {
                res.send(err.message)
            })
    }

    static addPage(req, res) {
        res.render('monster-add.ejs')
    }

    static add(req, res) {
        Monster.create(req.body)
            .then(() => {
                res.redirect('/admin/monsters')
            })
            .catch(err => {
                res.send(err.message)
            })
    }

    static getOne(req, res) {
        Monster.findOne({
                where: {
                    name: req.params.name
                }
            })
            .then(monster => {
                res.render('monster-edit.ejs', {
                    monster
                })
            })
            .catch(err => {
                res.send(err.message)
            })
    }

    static updateMonster(req, res) {
        Monster.update(req.body, {
                where: {
                    'id': req.body.id
                }
            })
            .then(() => {
                res.redirect('/admin/monsters')
            })
            .catch(err => {
                res.send(err.message)
            })
    }

    static delete(req, res) {
        Monster.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect('/admin/monsters')
            })
            .catch(err => {
                res.send(err.message)
            })
    }

    static search(req, res) {
        let searchBy = req.body.by
        let search = req.body.search

        if (searchBy == 'id') {
            Monster.findAll({
                    where: {
                        id: Number(search)
                    }
                })
                .then(monsters => {
                    res.render('monsters.ejs', {
                        monsters
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.send('Wrong input')
                })

        } else if (searchBy == 'name') {
            Monster.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    }
                })
                .then(monsters => {
                    res.render('monsters.ejs', {
                        monsters
                    })
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static getMonster(req, res) {
        User.findOne({
                where: {
                    username: req.params.username
                }
            })
            .then(userExist => {
                let userExp = userExist.dataValues.exp
                if (userExp < 100) {
                    return '3'
                } else if (userExp < 200) {
                    return '6'
                } else if (userExp < 300) {
                    return '10'
                } else {
                    return '10'
                }
            })
            .then(monsterLv => {
                return Monster.findAll({
                    where: {
                        level: {
                            [Op.lte]: Number(monsterLv)
                        }
                    }
                })
            })
            .then(monsters => {
                let monstersId = []
                for (const monster of monsters) {
                    monstersId.push(monster.dataValues.id)
                }
                let randomIdx = Math.floor(Math.random() * monstersId.length)
                let randomMons = monstersId[randomIdx]
                return randomMons
            })
            .then(randomMons => {
                Monster.findByPk(randomMons)
                    .then(monster => {
                        res.render('dungeon.ejs', {
                            monster: monster
                        })
                    })
            })
            .catch(err => {
                // console.log(err, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                res.send(err)
            })
    }
}
module.exports = ControllerMonster