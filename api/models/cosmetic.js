const mongoose=require('mongoose')

const cosmeticsSchema=mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
    qty:Number,
    img:String

})


module.exports=mongoose.model('cosmetics',cosmeticsSchema)