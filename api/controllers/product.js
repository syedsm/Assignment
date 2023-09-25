const category=require('../models/category')

exports.add=(req,res)=>{
    // console.log(req.file)
    // console.log(req.body)
    const {name,desc}=req.body
    const filename=req.file.filename
    try{

        const record=new category({name:name,desc:desc,img:filename})
        // console.log(record)
        record.save()
        res.json({
            status:201,
            apiData:record,
            message:"Successfully Product Add"
        })
    }catch(error){
        res.json({
            status:400,
        message:error.message
        })
    }
}
exports.fetch=async(req,res)=>{
    try {
        const record = await category.find()
        res.json({
            status: 200,
            apiData: record
        })
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}

exports.singleupdate=async(req,res)=>{
    // console.log(req.params.id) 
    const id=req.params.id
    try {
        const record = await category.findById(id)
        res.json({
            status: 200,
            apiData: record
        })
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}
exports.productupdate=async(req,res)=>{
    // console.log(req.params.id)
    // console.log(req.body)
    const id = req.params.id
    const { name, desc, price, qty, status } = req.body
    try {

        if (req.file) {
            const filename = req.file.filename
            await category.findByIdAndUpdate(id, { name: name, desc: desc,  img: filename, status: status })

        } else {
            await category.findByIdAndUpdate(id, { name: name, desc: desc, status: status })

        }
        res.json({
            status: 200,
            message: "Successfully Product Category has been Updated"
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}
    exports.delete = async (req, res) => {
        // console.log(req.params.id)
        const id = req.params.id
        try {
            await category.findByIdAndDelete(id)
            res.json({
                status: 200,
                message: "Successfully Category Deleted"
            })
        }
        catch (error) {
            res.json({
                status: 400,
                message: error.message
            })
        }
    
    }
