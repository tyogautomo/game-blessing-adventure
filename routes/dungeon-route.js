const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/controller-user')
const ControllerMonster = require('../controllers/controller-monster')
const ControllerUserMonster = require('../controllers/controller-usermonster')
const ControllerItem = require('../controllers/controller-item')

// router.get('/:username', ControllerMonster.getMonster)
// router.get('/:username/:monsterId', ControllerUserMonster.battleArena)
// router.get('/:username/:monsterId/:battleId', ControllerUserMonster.nextArena)
// router.post('/:username/:monsterId/:battleId', ControllerUserMonster.attack)

module.exports = router;