const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/newStore',).then(() => {
    console.log('Connected to the database!')
}).catch((err) => {
    console.log('Cannot connect to the database!', err)
})

module.exports = mongoose.connection;