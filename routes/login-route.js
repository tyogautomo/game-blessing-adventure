const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/controller-user')

router.get('/', (req, res) => {
    res.render('login.ejs', {
        flash: req.flash()
    })
})
router.post('/', ControllerUser.login)

module.exports = router;