const mongoose = require('mongoose')
const config = require('../config')
const logger = require('../logger')

const openConnection = async () => {

    const dbHostUrl = config.mongoose.url
    const dbConnection = mongoose.createConnection(dbHostUrl, config.mongoose.options)

    dbConnection.on('open', () => {

        logger.info(`Mongoose connection open to ${JSON.stringify(dbHostUrl)}`)

    } )

    dbConnection.on('error', (err) => {

        throw new Error(`Mongoose connection error: ${err} with connection info ${JSON.stringify(dbHostUrl)}`)

    } )

    return dbConnection

}

exports.mongoConnection = (openConnection)()
