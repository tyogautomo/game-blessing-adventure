const session = require('express-session')
const express = require('express')
const app = express()
const port = 3000
const flash = require('express-flash')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(flash());

const homeRouter = require('./routes/home-route')
const registerRouter = require('./routes/register-route')
const loginRouter = require('./routes/login-route')
const userRouter = require('./routes/user-route')
const logoutRouter = require('./routes/logout-route')
const dungeonRouter = require('./routes/dungeon-route')
const itemRouter = require('./routes/item-route')
const marketRouter = require('./routes/market-route')
const smithRouter = require('./routes/smith-route')
const adminRouter = require('./routes/admin-route')

app.use((req, res, next) => {
    res.locals.user = req.session.currentUser || {
        name: ""
    }
    next()
})

app.use('/', homeRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/leaderboard', userRouter)

// LOGIN PRIVILEGE
app.use((req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        req.flash('error', 'Please Login to access the game')
        res.redirect('/')
    }
})

app.use('/userpage', express.static('public'), userRouter)
app.use('/logout', logoutRouter)
app.use('/dungeon', express.static('public'), dungeonRouter)
app.use('/loot', express.static('public'), itemRouter)
app.use('/item', express.static('public'), itemRouter)
app.use('/marketplace', express.static('public'), marketRouter)
app.use('/blacksmith', express.static('public'), smithRouter)

// GM PRIVILEGE
app.use((req, res, next) => {
    if (req.session.currentUser.username == 'admin') {
        next()
    } else {
        res.send(`You're not an admin`)
    }
})

app.use('/admin', express.static('public'), adminRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))