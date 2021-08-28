const mongoose = require("mongoose")

const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS
} = process.env

let conn = null

module.exports = async () => {
    if (conn == null) {
        conn = mongoose.connect(`mongodb+srv://${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            serverSelectionTimeoutMS: 4500,
            autoCreate: false,
            auth: {
                user: DB_USER,
                password: DB_PASS
            }
        }).then(() => mongoose)
        
        await conn
    }

    return conn
}