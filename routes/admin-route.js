const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/controller-user')
const ControllerMonster = require('../controllers/controller-monster')
const ControllerUserMonster = require('../controllers/controller-usermonster')
const ControllerItem = require('../controllers/controller-item')
const ControllerUserItem = require('../controllers/controller-useritem')

// ------------------------ USERS
router.get('/users', ControllerUser.getAll)
router.get('/users/edit/:username', ControllerUser.getOne)
router.post('/users/edit/:username', ControllerUser.updateUser)
router.get('/users/delete/:username', ControllerUser.delete)
router.post('/users/search', ControllerUser.search)

// ------------------------- MONSTERS
router.get('/monsters', ControllerMonster.getAll)
router.get('/monsters/edit/:name', ControllerMonster.getOne)
router.post('/monsters/edit/:name', ControllerMonster.updateMonster)
router.get('/monsters/delete/:name', ControllerMonster.delete)
router.post('/monsters/search', ControllerMonster.search)
router.get('/monsters/add', ControllerMonster.addPage)
router.post('/monsters/add', ControllerMonster.add)

// ------------------------- ITEMS
router.get('/items', ControllerItem.getAll)
router.get('/items/edit/:name', ControllerItem.getOne)
router.post('/items/edit/:name', ControllerItem.updateItem)
router.get('/items/delete/:name', ControllerItem.delete)
router.post('/items/search', ControllerItem.search)
router.get('/items/add', ControllerItem.addPage)
router.post('/items/add', ControllerItem.add)

module.exports = router;