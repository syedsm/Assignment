const Item = require('../models/item')
const Decor = require('../models/Decor')
const cosmetic = require('../models/cosmetic')
const electricappliance = require('../models/electricappliance')
const grocerie = require('../models/Grocerie')
const toys = require('../models/toys')
const { model } = require('mongoose')


exports.add = (req, res) => {
    // console.log(req.body)
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
        // console.log(record)
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
    // console.log(req.body)
    const { ids } = req.body;
    // console.log(ids)

    try {
        const models = { grocerie, cosmetic, electricappliance, toys, Decor, };

        // Create an object to store the found data for each model
        const Data = [];

        // Iterate over each model and find data based on the array of IDs
        for (let modelName in models) {
            // Data[modelName] = await models[modelName].find({ _id: { $in: ids } });
            const modelData = await models[modelName].find({ _id: { $in: ids } });
            Data.push(...modelData);

        }
        // console.log(Data)
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

exports.billing = async (req, res) => {
    const idsString = req.body.productIdsArray;
    // const ids = req.body
    // console.log(idsString)
    
    try {
        const models = { grocerie, cosmetic, electricappliance, toys, Decor };

        //  found and store each model data in this blank array and push modelData
        const Data = [];
        const modelIds = idsString.split(',');// for divide each ids sepratelty for find each models
        for (let modelName in models) { // Iterate over each model and find data based on the array of IDs

            const modelData = await models[modelName].find({ _id: { $in: modelIds } });
            // Data[modelName] = modelData;
            Data.push(...modelData)
        }

        // console.log(Data);
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