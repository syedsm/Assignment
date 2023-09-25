const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: String,
    desc:String,
    img:String,
    // price:Number,
    // quantity:Number,
    status:{type:String,default:'IN-STOCK'},
})

module.exports = mongoose.model('category', categorySchema)