const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/controller-user')
const ControllerMonster = require('../controllers/controller-monster')
const ControllerUserMonster = require('../controllers/controller-usermonster')
const ControllerItem = require('../controllers/controller-item')
const ControllerUserItem = require('../controllers/controller-useritem')

// router.get('/:username/:battleId', ControllerItem.randomItem)
// router.post('/:username/:battleId', ControllerUserItem.gatherItems)
// router.get('/sell/:username/:userItemId', ControllerUserItem.sell)
// router.get('/use/:username/:userItemId', ControllerUserItem.use)

module.exports = router;