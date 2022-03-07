const { logger } = require('../utils/logger')

module.exports = {
    async up(db, client) {

        logger.info('[up] create-token-collection')

        // TOKEN COLLECTION

        const tokenCollection = await db.createCollection('token')

        logger.debug('token collection was created')

        await tokenCollection.createIndexes( [
            {
                key    : { token: 1, user: 1, type: 1 },
                name   : 'token_per_user_u',
                unique : true,
            },
            {
                key                : { expires: 1 },
                name               : 'expires_index',
                expireAfterSeconds : 0,
            },
        ] )

        logger.debug('token indexes were created')

    },

    async down(db, client) {

        logger.info('[down] create-token-collection')
        await db.dropCollection('token')
        logger.debug('token collection was dropped')

    },
}
