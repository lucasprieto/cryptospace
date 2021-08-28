const validateToken = require('../../apiutils/jwt')
const connectToDb  = require('../../apiutils/db')
const Wallet = require('../../apiutils/models/Wallet')

module.exports = async (req, res) => {
    const token = await validateToken(req)
    if (!token) {
        res.status(403).send({ error: 'Forbidden' })
        return
    }

    await connectToDb()
    const docs = await Wallet.find({ user: token.sub })
    res.status(200).send(docs)
}