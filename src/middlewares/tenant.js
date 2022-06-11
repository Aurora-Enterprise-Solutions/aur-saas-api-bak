const { getNamespace, createNamespace } = require('cls-hooked')
const config = require('../config/config')
const { database } = require('../config/db/cv')

const dbNamespace = getNamespace(database.namespace) || createNamespace(database.namespace)

const mgmRoutes = [
    '/v1/auth/login',
]

const tenantSelection = (req, res, next) => {

    return dbNamespace.runAndReturn(async () => {

        if (mgmRoutes.includes(req.originalUrl) ) {

            dbNamespace.set(database.isMgm, true)

        }
        else {

            dbNamespace.set(database.isMgm, false)
            dbNamespace.set(database.tenantId, req.user.tenantId)

        }

        return await next()

    } )

}

module.exports = tenantSelection
