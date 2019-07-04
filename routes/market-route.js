const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/controller-user')
const ControllerMonster = require('../controllers/controller-monster')
const ControllerUserMonster = require('../controllers/controller-usermonster')
const ControllerItem = require('../controllers/controller-item')
const ControllerUserItem = require('../controllers/controller-useritem')

router.get('/:username', ControllerItem.marketplace)
router.get('/:username/buy/:itemId', ControllerUserItem.merchantBuy)

module.exports = router;