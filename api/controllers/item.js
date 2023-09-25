const Item = require('../models/item')
const Decor = require('../models/Decor')
const cosmetic = require('../models/cosmetic')
const electricappliance = require('../models/electricappliance')
const grocerie = require('../models/Grocerie')
const toys = require('../models/toys')


exports.add = (req, res) => {
    console.log(req.body)
    // console.log(req.file.filename)
    const { selectedCat, name, desc, qty, price, exp } = req.body;
    const filename = req.file.filename

    try {

        let record;

        switch (selectedCat) {
            case 'grocerie':
                record = new grocerie({ name: name, desc: desc, qty: qty, price: price, exp: exp, img: filename });
                break;
            case 'decor':
                record = new Decor({ name: name, desc: desc, qty: qty, price: price, img: filename });
                break;
            case 'cosmetics':
                record = new cosmetic({ name: name, desc: desc, qty: qty, price: price, img: filename });
                break;
            case 'toys':
                record = new toys({ name: name, desc: desc, qty: qty, price: price, img: filename });
                break;
            case 'electricaplliance':
                record = new electricappliance({ name: name, desc: desc, qty: qty, price: price, img: filename });
                break;
            default:
                console.log('Invalid category');
        }
        console.log(record)
        record.save()
        res.json({
            status: 201,
            apidata: record,
            message: 'Item Add Successfully',
        });
    }
    catch (error) {
        res.json({
            status: 400,
            message: error.message
        })

    }
}

exports.fetchitem = async (req, res) => {
    // console.log(req.body)
    const { selectedCategory } = req.body;
    try {

        let items;
        switch (selectedCategory) {
            case 'grocerie':
                items = await grocerie.find();
                break;
            case 'decor':
                items = await Decor.find();
                break;
            case 'cosmetics':
                items = await cosmetic.find();
                break;
            case 'toys':
                items = await toys.find();
                break;
            case 'electricaplliance':
                items = await electricappliance.find();
                break;

            default:
                console.log('Invalid category');
        }
        res.json({
            status: 200,
            apidata: items,
            message: 'Items fetched successfully',
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
   
}

exports.cart = async (req, res) => {
    
    const { ids } = req.body;

    try {
        const models = { grocerie, cosmetic, electricappliance, toys, Decor, };

        // Create an object to store the found data for each model
        const Data = {};

        // Iterate over each model and find data based on the array of IDs
        for (let modelName in models) {
            Data[modelName] = await models[modelName].find({ _id: { $in: ids } });
        }
        console.log(Data)
        res.json({
            status: 200,
            apidata: Data,
            message: 'Successfully fetched',
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }

}

// exports.add=(req,res)=>{
//     // console.log(req.body)
//     // console.log(req.file.filename)

//     const filename=req.file.filename
//     const {name,desc,qty,price}=req.body
//     try{

//         const record=new Item({name:name,desc:desc,qty:qty,price:price,img:filename})
//         // console.log(record)
//         record.save()
//         res.json({
//             status:201,
//             apidata:record,
//             message:"Item Add Successfully"
//         })
//     }catch(error){
//         res.json({status:400,message:error.message})
//     }
// }

// exports.fetch = async (req, res) => {
//     try {
//         const record = await Item.find()
//         res.json({
//             status: 200,
//             apiData: record
//         })
//     } catch (error) {
//         res.json({
//             status: 500,
//             message: error.message
//         })
//     }
// }
// exports.cart = async (req, res) => {

//     try {
//         const { ids } = req.body
//         const record = await Item.find({ _id: { $in: ids } })
//         // console.log(record)
//         res.json({
//             status: 200,
//             apiData: record,
//             message: "Suucessfully Delivered"
//         })
//     } catch (error) {
//         res.json({
//             status: 400,
//             message: error.message
//         })
//     }
// }

