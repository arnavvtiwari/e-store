const mongoose = require('mongoose')

const sellerSchema = mongoose.Schema({
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
        required: true
    },
    products: {
        type: Array,
        default: []
    }
})
module.exports = mongoose.model('Seller', sellerSchema);