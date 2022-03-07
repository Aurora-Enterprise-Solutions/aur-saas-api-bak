const { logger } = require('../utils/logger')

module.exports = {
    async up(db, client) {

        logger.info('[up] changelog')
        await db.createCollection('changelog')
        logger.debug('changelog collection was created')

    },

    async down(db, client) {

        logger.info('[down] changelog')
        await db.dropCollection('changelog')
        logger.debug('changelog collection dropped')

    },
}
