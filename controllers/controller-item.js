const {
    User,
    Monster,
    Item,
    UserItem,
    UserMonster
} = require('../models/index')

const Op = require('sequelize').Op

class ControllerItem {

    // ---------------------------------- BASIC CRUD
    static getAll(req, res) {
        Item.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
            .then(items => {
                res.render('items.ejs', {
                    items
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getOne(req, res) {
        Item.findOne({
                where: {
                    name: req.params.name
                }
            })
            .then(item => {
                res.render('item-edit.ejs', {
                    item: item.dataValues
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static updateItem(req, res) {
        let data = {
            name: req.body.name,
            price: Number(req.body.price),
            type: req.body.type,
            effect: Number(req.body.effect),
            updatedAt: new Date()
        }

        Item.update(data, {
                where: {
                    id: Number(req.body.id)
                }
            })
            .then(() => {
                res.redirect('/admin/items')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static delete(req, res) {
        Item.destroy({
                where: {
                    name: req.params.name
                }
            })
            .then(() => {
                res.redirect('/admin/items')
            })
    }

    static search(req, res) {
        let searchBy = req.body.by
        let search = req.body.search

        if (searchBy == 'id') {
            Item.findAll({
                    where: {
                        id: Number(search)
                    }
                })
                .then(items => {
                    res.render('items.ejs', {
                        items
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.send('Wrong input')
                })

        } else if (searchBy == 'name') {
            Item.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    }
                })
                .then(items => {
                    res.render('items.ejs', {
                        items
                    })
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static addPage(req, res) {
        res.render('item-add.ejs')
    }

    static add(req, res) {
        let newItem = {
            name: req.body.name,
            price: Number(req.body.price),
            type: req.body.type,
            effect: Number(req.body.effect),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        Item.create(newItem)
            .then(() => {
                res.redirect('/admin/items')
            })
            .catch(err => {
                res.send(err)
            })
    }

    // ---------------------------------- ADVANCED
    static randomItem(req, res) {
        Item.findAll({
                where: {
                    type: ['sellable', 'crafting']
                }
            })
            .then(items => {
                // console.log(JSON.stringify(items, null, 2))
                let randomItems = []
                let LootMultiplier = Math.floor((Math.random() * 3) + 3)
                for (let i = 0; i < LootMultiplier; i++) {
                    let randomIdx = Math.floor(Math.random() * items.length)
                    randomItems.push(items[randomIdx])
                }
                return randomItems
            })
            .then(items => {
                return Promise.all([items, Item.findAll({
                    where: {
                        type: ['attack', 'defense']
                    }
                })])

            })
            .then(([items, rareItems]) => {
                let randomChance = Math.floor(Math.random() * 21)
                let randomRareIdx = Math.floor(Math.random() * rareItems.length)
                // console.log(randomChance)
                if (randomChance == 5) {
                    items.push(rareItems[randomRareIdx])
                }
                res.render('loots.ejs', {
                    items: items
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static marketplace(req, res) {
        Item.findAll({
                where: [{
                    type: ['defense', 'attack']
                }]
            })
            .then(items => {
                // console.log(items)
                res.render('marketplace.ejs', {
                    items: items
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static blacksmith(req, res) {
        Item.findAll({
                where: {
                    type: ['attack', 'defense']
                }
            })
            .then(items => {
                return Promise.all([items, User.findOne({
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
            .then(([items, userExist]) => {
                // console.log(JSON.stringify(userExist.dataValues.UserItems, null, 2))
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

                res.render('blacksmith.ejs', {
                    items: items,
                    currentUser: userExist.dataValues.UserItems,
                    relatedItems: compiled
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerItem