const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/controller-user')

router.get('/', (req, res) => {
    res.render('register.ejs')
})
router.post('/', ControllerUser.register)

module.exports = router;