const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/controller-user')

router.get('/', ControllerUser.leaderboard)
router.post('/', ControllerUser.sort)
router.get('/:username', ControllerUser.userPage)


module.exports = router;