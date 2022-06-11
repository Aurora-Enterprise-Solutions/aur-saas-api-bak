const httpStatus = require('http-status')
const { getNamespace } = require('cls-hooked')
const config = require('../config')
const logger = require('../logger')
const { database } = require('./cv')
const { mongoConnection } = require('./dbConnection')
const ApiError = require('../../utils/ApiError')

const mongooseModel = ( { name, schema } ) => {

    const db = getTennantConnection()
    db.model(name, schema)

    return db.model(name)

}

const getTennantConnection = () => {

    const dbNamespace = getNamespace(database.namespace)
    const isMgmInstance = dbNamespace.get(database.isMgm)
    const tenantId = dbNamespace.get(database.tenantId)
    const dbName = isMgmInstance ? config.mongoose.mgmName : `${config.mongoose.tenantNamePrefix}-${tenantId}`

    if (mongoConnection() ) {

        // useDb will return new connection
        const db = mongoConnection().useDb(dbName, { useCache: true } )
        logger.info(`DB switched to ${dbName}`)

        return db

    }

    return new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Mongo connection not initialized')

}

module.exports = {
    mongooseModel,
}
