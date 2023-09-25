const mongoose=require('mongoose')

const grocerieSchema=mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
    qty:Number,
    img:String
})

module.exports=mongoose.model('grocerie',grocerieSchema)