const mongoose = require('mongoose')

const modelName = 'Wallet'
const modelSchema = new mongoose.Schema({
    user: {}
})

let model = mongoose.model(modelName, modelSchema)

module.exports = mongoose.model(modelName, modelSchema)