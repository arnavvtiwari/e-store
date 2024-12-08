const express = require('express')
const app = express()
const cookieparser = require('cookie-parser')
const path = require('path')
const db = require('./config/connection')
const sellerRouter = require('./routes/seller.routes')
const userRouter = require('./routes/user.routes')
const productRouter = require('./routes/product.routes')
const indexRouter = require('./routes/index.routes')
const expressSession = require('express-session')
const flash = require('connect-flash')
require('dotenv').config()

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

app.use('/seller', sellerRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/', indexRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
}) 