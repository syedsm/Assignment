const mongoose=require('mongoose')

const electricappliance=mongoose.Schema({

    name:String,
    desc:String,
    price:Number,
    qty:Number,
    img:String

})


module.exports=mongoose.model('electricappliance',electricappliance)