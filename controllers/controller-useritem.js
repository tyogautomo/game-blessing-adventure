const {
    User,
    Monster,
    Item,
    UserMonster,
    UserItem
} = require('../models/index')

class ControllerUserItem {

    static gatherItems(req, res) {

        let items = req.body.id
        if (typeof items === 'object') {
            let data = []
            for (let i = 0; i < items.length; i++) {
                let obj = {
                    UserId: req.session.currentUser.id,
                    ItemId: items[i]
                }
                data.push(obj)
            }

            UserItem.bulkCreate(data)
                .then(() => {
                    res.redirect(`/userpage/${req.session.currentUser.username}`)
                })
                .catch(err => {
                    res.send(err)
                })
        } else {
            Item.findByPk(Number(items))
                .then(items => {
                    let data = {
                        UserId: req.session.currentUser.id,
                        ItemId: items.dataValues.id
                    }
                    return UserItem.create(data)

                })
                .then(user => {
                    res.redirect(`/userpage/${req.session.currentUser.username}`)
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static sell(req, res) {
        UserItem.findByPk(req.params.userItemId)
            .then(userItem => {
                return Promise.all([Item.findByPk(userItem.dataValues.ItemId), userItem])
            })
            .then(([item, userItem]) => {
                return Promise.all([item, User.findByPk(userItem.dataValues.UserId)])
            })
            .then(([item, userExist]) => {
                let currentBalance = userExist.dataValues.balance
                let updateBalance = currentBalance + item.dataValues.price
                let data = {
                    balance: updateBalance
                }
                return Promise.all([User.update(data, {
                    where: {
                        id: req.session.currentUser.id
                    }
                }), userExist])
            })
            .then(([updated, userExist]) => {
                return Promise.all([UserItem.findByPk(req.params.userItemId), userExist])
            })
            .then(([userItem, userExist]) => {
                userItem.destroy()
                res.redirect(`/userpage/${userExist.dataValues.username}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static use(req, res) {
        UserItem.findByPk(req.params.userItemId)
            .then(userItem => {
                return Promise.all([Item.findByPk(userItem.dataValues.ItemId), userItem])
            })
            .then(([item, userItem]) => {
                return Promise.all([item, User.findByPk(userItem.dataValues.UserId)])
            })
            .then(([item, userExist]) => {
                let currentHP = userExist.dataValues.hp
                let currentAP = userExist.dataValues.ap
                let data = {}

                if (item.dataValues.type == 'attack') {
                    let updateAttack = currentAP + item.dataValues.effect
                    data = {
                        ap: updateAttack
                    }
                } else {
                    let updateDefense = currentHP + item.dataValues.effect
                    data = {
                        hp: updateDefense
                    }
                }

                return Promise.all([User.update(data, {
                    where: {
                        id: req.session.currentUser.id
                    }
                }), userExist])

            })
            .then(([updated, userExist]) => {
                return Promise.all([UserItem.findByPk(req.params.userItemId), userExist])
            })
            .then(([userItem, userExist]) => {
                return Promise.all([userItem.destroy(), userExist])
            })
            .then(([deleted, userExist]) => {
                res.redirect(`/userpage/${userExist.dataValues.username}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static merchantBuy(req, res) {
        Item.findByPk(req.params.itemId)
            .then(item => {
                return Promise.all([item, User.findByPk(req.session.currentUser.id)])
            })
            .then(([item, userExist]) => {
                if (userExist.dataValues.balance < item.dataValues.price) {
                    res.render('insufficient.ejs', {
                        message: 'Sorry, insufficient balance',
                        currentUser: userExist.dataValues
                    })
                } else {
                    let data = {
                        UserId: req.session.currentUser.id,
                        ItemId: item.dataValues.id,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                    return Promise.all([item, userExist, UserItem.create(data)])
                }
            })
            .then(([item, userExist]) => {
                let currentBalance = userExist.dataValues.balance
                let updateBalance = currentBalance - item.dataValues.price
                let data = {
                    balance: updateBalance
                }
                return Promise.all([userExist, User.update(data, {
                    where: {
                        id: req.session.currentUser.id
                    }
                })])
            })

            .then(([userExist]) => {
                res.redirect(`/userpage/${userExist.dataValues.username}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static forge(req, res) {

        Item.findOne({
                where: {
                    name: req.params.item
                }
            })
            .then(item => {
                return Promise.all([item, User.findOne({
                    where: {
                        id: req.session.currentUser.id
                    },
                    include: {
                        model: UserItem,
                        include: {
                            model: Item
                        }
                    }
                })])
            })
            .then(([item, userExist]) => {
                let relatedItems = []
                for (let i = 0; i < userExist.dataValues.UserItems.length; i++) {
                    let itemType = userExist.dataValues.UserItems[i].Item.type
                    if (itemType == 'crafting') {
                        relatedItems.push(userExist.dataValues.UserItems[i].Item.dataValues)
                    }
                }

                let compiled = {}
                for (let i = 0; i < relatedItems.length; i++) {
                    if (compiled[relatedItems[i].name] == undefined) {
                        compiled[relatedItems[i].name] = {
                            id: relatedItems[i].id,
                            name: relatedItems[i].name,
                            count: 0
                        }
                    }
                    compiled[relatedItems[i].name].count++
                }
                // console.log(compiled)
                res.render('forge.ejs', {
                    item: item,
                    currentUser: userExist.dataValues,
                    relatedItems: compiled,
                    flash: req.flash()
                })
            })

    }

    static craft(req, res) {
        let build = req.params.item
        let material1 = req.body.name1
        let material2 = req.body.name2
        let material1count = Number(req.body.count1)
        let material2count = Number(req.body.count2)
        let userMaterial1 = req.body[material1]
        let userMaterial2 = req.body[material2]

        if (userMaterial1 < material1count || userMaterial2 < material2count || userMaterial1 == undefined || userMaterial2 == undefined) {
            req.flash('error', 'Sorry, Insufficient materials.')
            res.redirect(`/blacksmith/${req.session.currentUser.username}/craft/${req.params.item}`)
        } else {
            Item.findOne({
                    where: {
                        name: build
                    }
                })
                .then(item => {
                    let data = {
                        UserId: req.session.currentUser.id,
                        ItemId: item.dataValues.id
                    }
                    return Promise.all([item, UserItem.create(data)])
                })
                .then(([item]) => {
                    return User.findOne({
                        where: {
                            id: req.session.currentUser.id
                        },
                        include: {
                            model: UserItem,
                            include: {
                                model: Item
                            }
                        }
                    })
                })
                .then(userExist => {
                    let materials1 = []
                    let materials2 = []
                    for (const item of userExist.dataValues.UserItems) {
                        if (item.dataValues.Item.dataValues.name == material1) {
                            materials1.push(item.dataValues.id)
                        } else if (item.dataValues.Item.dataValues.name == material2) {
                            materials2.push(item.dataValues.id)
                        }
                    }
                    return ([materials1, materials2])
                })
                .then(([materials1, materials2]) => {
                    let materialsDelete = []
                    for (let i = 0; i < material1count; i++) {
                        materialsDelete.push(materials1[i])
                    }
                    for (let i = 0; i < material2count; i++) {
                        materialsDelete.push(materials2[i])
                    }

                    UserItem.destroy({
                        where: {
                            id: materialsDelete
                        }
                    })
                    res.redirect(`/userpage/${req.session.currentUser.username}`)
                })
                .catch(err => {
                    res.send(err.message)
                })
        }
    }
}

module.exports = ControllerUserItem