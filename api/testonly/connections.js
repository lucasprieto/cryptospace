const connectToDb  = require('../../apiutils/db')
const Wallet = require('../../apiutils/models/Wallet')

module.exports = async (req, res) => {
    await connectToDb()
    const docs = await Wallet.find({})
    res.status(200).send(docs)
}