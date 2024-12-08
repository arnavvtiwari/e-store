const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    orders: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('User', userSchema)