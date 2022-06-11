const mongoose = require('mongoose')
const config = require('../config')
const logger = require('../logger')

const mongoConnections = {
    default: null,
}

const openConnection = async (instance = 'default', dbHostUrl = config.mongoose.url) => {

    try {

        const dbConnection = await mongoose.createConnection(dbHostUrl, config.mongoose.options)
        logger.info(`Mongoose connection open to ${JSON.stringify(dbHostUrl)}`)
        mongoConnections[instance] = dbConnection

    }
    catch (err) {

        throw new Error(`Mongoose connection error: ${err} with connection info ${JSON.stringify(dbHostUrl)}`)

    }

}

exports.mongoConnection = (instance = 'default') => {

    if (!mongoConnections[instance] )
        openConnection(instance)

    return mongoConnections[instance]

}

exports.openConnection = openConnection
