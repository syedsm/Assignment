const mongoose=require('mongoose')

const decorSchema=mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
    img:String,
    qty:Number,
})


module.exports=mongoose.model('decor',decorSchema)