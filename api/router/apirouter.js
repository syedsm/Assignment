const router = require('express').Router()
const multer = require('multer')
const regco = require('../controllers/regcontroller')
const product = require('../controllers/product')
const item = require('../controllers/item')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../billing/public/productimages')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 4 }
})


router.post('/reg', regco.reg)
router.post('/logincheck', regco.logincheck)
router.post('/productadd', upload.single('img'), product.add)
router.get('/allproduct', product.fetch)
router.get('/singleupdate/:id', product.singleupdate)
router.put('/productupdate/:id', upload.single('img'), product.productupdate)
router.delete('/delete/:id', product.delete)
router.post('/itemadd', upload.single('img'), item.add)

router.post('/itemfetch', item.fetchitem)
router.post('/cartproducts', item.cart)
router.post('/billing', item.billing)
router.get('/stockfetch',product.stockfetch)

module.exports = router
