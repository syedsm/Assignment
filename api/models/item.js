const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({

    name: String,
    qty: Number,
    price: Number,
    desc: String,
    img: String
})
module.exports = mongoose.model('Items', itemSchema)