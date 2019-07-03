const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/controller-user')
const ControllerMonster = require('../controllers/controller-monster')
const ControllerUserMonster = require('../controllers/controller-usermonster')
const ControllerUserItem = require('../controllers/controller-useritem')
const ControllerItem = require('../controllers/controller-item')

router.get('/:username', ControllerItem.blacksmith)

router.get('/:username/craft/:item', ControllerUserItem.forge)
router.post('/:username/craft/:item', ControllerUserItem.craft)

module.exports = router;