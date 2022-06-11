const { logger } = require('../utils/logger')

module.exports = {
    async up(db, client) {

        logger.info('[up] create-tenant-collection')

        // TENANT COLLECTION

        const tenantCollection = await db.createCollection('tenants')

        logger.debug('tenant collection was created')

        await tenantCollection.createIndexes( [
            {
                key    : { cdn: 1 },
                name   : 'cdn_u',
                unique : true,
            },
        ] )

        logger.debug('tenant indexes were created')

    },

    async down(db, client) {

        logger.info('[down] create-tenant-collection')
        await db.dropCollection('tenants')
        logger.debug('tenant collection was dropped')

    },
}
