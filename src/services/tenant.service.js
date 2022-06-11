const { getNamespace } = require('cls-hooked')
const { database } = require('../config/db/cv')
const { mongooseModel } = require('../config/db/connectionManager')
const Tenant = require('../models/tenant.model')

const getTenantByCdn = async (cdn) => {

    return await mongooseModel(Tenant).findOne( { cdn } )

}

const setTenantIdToDatabaseNamespace = (tenantId) => {

    const dbNamespace = getNamespace(database.namespace)
    dbNamespace.set(database.isMgm, false)
    dbNamespace.set(database.tenantId, tenantId)

}

module.exports = {
    getTenantByCdn,
    setTenantIdToDatabaseNamespace,
}
