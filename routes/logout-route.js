const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/controller-user')

router.get('/', ControllerUser.logout)

module.exports = router;