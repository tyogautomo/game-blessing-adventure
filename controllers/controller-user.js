const {
    User,
    Monster,
    Item,
    UserMonster,
    UserItem
} = require('../models/index')

const Op = require('sequelize').Op
const bcrypt = require('bcryptjs')

class ControllerUser {

    // ---------------------------- BASIC CRUD
    static getAll(req, res) {
        User.findAll({
                where: {
                    username: {
                        [Op.notIn]: ['admin']
                    }
                }
            })
            .then(users => {
                res.render('users.ejs', {
                    users
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getOne(req, res) {
        User.findOne({
                where: {
                    username: req.params.username
                }
            })
            .then(user => {
                res.render('user-edit.ejs', {
                    currentUser: user.dataValues
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static updateUser(req, res) {
        let data = {
            username: req.body.username,
            email: req.body.email,
            balance: req.body.balance,
            hp: req.body.hp,
            ap: req.body.ap,
            exp: req.body.exp,
            updatedAt: new Date()
        }

        User.update(data, {
                where: {
                    id: Number(req.body.id)
                }
            })
            .then(() => {
                res.redirect('/admin/users')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static delete(req, res) {
        User.destroy({
                where: {
                    username: req.params.username
                }
            })
            .then(() => {
                res.redirect('/admin/users')
            })
    }

    // ----------------------------- ADVANCED

    static search(req, res) {
        let searchBy = req.body.by
        let search = req.body.search

        if (searchBy == 'id') {
            User.findAll({
                    where: {
                        id: Number(search)
                    }
                })
                .then(users => {
                    res.render('users.ejs', {
                        users
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.send('Wrong input')
                })

        } else if (searchBy == 'username') {
            User.findAll({
                    where: {
                        username: {
                            [Op.iLike]: `%${search}%`
                        }
                    }
                })
                .then(users => {
                    res.render('users.ejs', {
                        users
                    })
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static register(req, res) {
        let data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            balance: 1000,
            hp: 100,
            ap: 5,
            exp: 0
        }

        User.create(data)
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static login(req, res) {
        User.findOne({
                where: {
                    username: req.body.username
                }
            })
            .then(userExist => {
                if (userExist) {
                    let check = bcrypt.compareSync(req.body.password, userExist.password)
                    if (check) {
                        req.session.currentUser = {
                            id: userExist.dataValues.id,
                            username: userExist.dataValues.username,
                            email: userExist.dataValues.email,
                            hp: userExist.dataValues.hp,
                            ap: userExist.dataValues.ap,
                            balance: userExist.dataValues.balance,
                            exp: userExist.dataValues.exp,
                        }
                        res.redirect(`/userpage/${req.session.currentUser.username}`)
                    } else {
                        res.send('Wrong password')
                    }
                } else {
                    res.send('Wrong username')
                }
            })
    }

    static userPage(req, res) {

        if (req.params.username != req.session.currentUser.username) {
            res.send(`You're not logged in as ${req.params.username}`)
        } else {
            User.findOne({
                    where: {
                        username: req.params.username
                    },
                    include: [{
                        model: UserMonster,
                        include: {
                            model: Monster
                        }
                    }, {
                        model: UserItem,
                        include: {
                            model: Item
                        }
                    }]
                })
                .then(userExist => {
                    let userMonsters = userExist.dataValues.UserMonsters
                    let userItems = userExist.dataValues.UserItems
                    userMonsters.sort((a, b) => b.dataValues.createdAt - a.dataValues.createdAt)
                    userItems.sort((a, b) => b.dataValues.createdAt - a.dataValues.createdAt)

                    res.render('user-page.ejs', {
                        userExist: userExist.dataValues,
                        userMonsters: userMonsters,
                        userItems: userItems
                    })
                })
        }
    }

    static logout(req, res) {
        req.session.currentUser = {}
        res.redirect('/')
    }

    static leaderboard(req, res) {
        let sort = 'exp'
        let direction = 'DESC'
        User.findAll({
                where: {
                    username: {
                        [Op.notIn]: ['admin']
                    }
                },
                order: [
                    [`${sort}`, `${direction}`]
                ]
            })
            .then(users => {
                res.render('leaderboard.ejs', {
                    users,
                    sort,
                    direction
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static sort(req, res) {
        let sort = req.body.sort
        let direction = req.body.direction

        User.findAll({
                where: {
                    username: {
                        [Op.notIn]: ['admin']
                    }
                },
                order: [
                    [`${sort}`, `${direction}`]
                ]
            })
            .then(users => {
                res.render('leaderboard.ejs', {
                    users,
                    sort,
                    direction
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerUser