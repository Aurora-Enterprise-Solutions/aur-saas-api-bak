const httpStatus = require('http-status')
const { getNamespace } = require('cls-hooked')
const config = require('../config')
const logger = require('../logger')
const { database } = require('./cv')
const { mongoConnection } = require('./index')
const ApiError = require('../../utils/ApiError')

const dbNamespace = getNamespace(database.namespace)

const mongooseModel = (modelName, schema) => {

    const db = getTennantConnection()
    db.model(modelName, schema)

    return db.model(modelName)

}

const getTennantConnection = () => {

    const tenantId = dbNamespace.get(database.tenantId)
    const dbName = `${config.mongoose.tenantNamePrefix}-${tenantId}`

    if (mongoConnection) {

        // useDb will return new connection
        const db = mongoConnection.useDb(dbName, { useCache: true } )
        logger.info(`DB switched to ${dbName}`)

        return db

    }

    return new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Mongo connection not initialized')

}

module.exports = {
    mongooseModel,
}
