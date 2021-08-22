const mongoose = require("mongoose")

const url = process.env.MONGO_DATABASE

const connect = async (options = {}) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            ...options
        })

    } catch (error) {
        // handle connection error
        console.error(error)
    }
}

module.exports = {
    connect
}
