require('dotenv').config()
const migration = require('migrate-mongo')
const commander = require('./utils/commander')
const { logger } = require('./utils/logger')

const program = commander( { description: 'Migration SDK for Aurora SaaS Management (MGM)' } )

async function migrate( { program } ) {

    const commandArgs = program.args

    const migrationConfig = {
        mongodb: {
            url          : process.env.AUR_SAAS_CLUSTER_HOST,
            databaseName : process.env.AUR_SAAS_MGM_DB_NAME,

            options: {
                useNewUrlParser    : true,
                useUnifiedTopology : true,
            },
        },
        migrationsDir           : 'migrations/management',
        changelogCollectionName : 'changelog',
        migrationFileExtension  : '.js',
        useFileHash             : false,
    }

    migration.config.set(migrationConfig)

    const { db, client } = await migration.database.connect()

    if (commandArgs[0] === 'up') {await migration.up(db, client)}
    else if (commandArgs[0] === 'down') {await migration.down(db, client)}
    else if (commandArgs[0] === 'create') {await migration.create(commandArgs[1] )}
    else if (commandArgs[0] === 'status') {

        const migrationStatus = await migration.status(db)
        migrationStatus.forEach( ( { fileName, appliedAt } ) => logger.info(fileName, ':', appliedAt) )

    }


    logger.info('All done!')
    process.exit(0)

}

migrate( { program } )
