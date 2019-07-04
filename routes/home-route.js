const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home.ejs', {
        flash: req.flash()
    })
})

module.exports = router;