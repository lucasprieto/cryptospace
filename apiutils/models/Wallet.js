const mongoose = require('mongoose')

const modelName = 'Wallet'

const tokenSchema = new mongoose.Schema({
    contractAddress: { type: String, required: true },
    ticker: { type: String },
    name: { type: String },
    balance: { type: Number, required: true, default: 0 }
}, { timestamps: { updatedAt: true } })

const modelSchema = new mongoose.Schema({
    user: { type: String },
    platform: { type: String, enum: ['ethereum', 'bsc', 'polygon'], required: true, default: 'ethereum' },
    address: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
    tokens: [tokenSchema]
}, { timestamps: { updatedAt: true, createdAt: true } })

module.exports = mongoose.models[modelName] || mongoose.model(modelName, modelSchema)