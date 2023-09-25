const mongoose=require('mongoose')

const toysSchema=mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
    qty:Number,
    img:String
})


module.exports=mongoose.model('toys',toysSchema)