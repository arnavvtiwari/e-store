const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://arnav:arnav123@cluster0.nnbtmu1.mongodb.net/newStore',).then(() => {
    console.log('Connected to the database!')
}).catch((err) => {
    console.log('Cannot connect to the database!', err)
})

module.exports = mongoose.connection;