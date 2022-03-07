const { logger } = require('../utils/logger')

module.exports = {
    async up(db, client) {

        logger.info('[up] create-user-collection')

        // USER COLLECTION

        const userCollection = await db.createCollection('user')

        logger.debug('user collection was created')

        await userCollection.createIndexes( [
            {
                key    : { email: 1 },
                name   : 'email_u',
                unique : true,
            },
        ] )

        logger.debug('user indexes were created')

    },

    async down(db, client) {

        logger.info('[down] create-user-collection')
        await db.dropCollection('user')
        logger.debug('user collection was dropped')

    },
}
