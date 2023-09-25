const express=require('express')
const app=express()
require('dotenv').config();
app.use(express.json())
const apirouter=require('./router/apirouter')
const mongoose=require('mongoose')
mongoose.connect(`${process.env.db_url}/${process.env.db_name}`)



app.use('/api',apirouter)
app.use(express.static('public'))
app.listen(process.env.port,()=>{console.log("Server is running 5000 ")})