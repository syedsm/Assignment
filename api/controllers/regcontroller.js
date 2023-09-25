const reg = require('../models/reg')

exports.reg = async (req, res) => {
    // console.log(req.body)
    const { Username, Password } = req.body
    try {
        const usercheck = await reg.findOne({ username: Username })
        if (usercheck == null) {

            const record = new reg({ username: Username, password: Password })
            record.save()
            res.json({
                status: 201,
                apiData: record,
                message: "Successfully account has been Created "
            })
        } else {
            res.json({
                status: 400,
                message: `${Username} Username Already taken`
            })

        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })

    }
}
exports.logincheck = async (req, res) => {
    // console.log(req.body)
    const { Username, Password } = req.body
    try {
        const record = await reg.findOne({ username: Username })
        // console.log(record)
        if (record !== null) {
            // if (record.username == "Admin") {
                // if (record.status == "active") 
                // {
                    res.json({
                        status: 201,
                        apiData: record
                    })
                // }
            // }
        }
        else {
            res.json({
                status: 400,
                message: "Wrong Credaintles"
            })
        }


    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}