/* eslint-disable security/detect-child-process */
const inquirer = require('inquirer')
const shell = require('child_process').execSync
const { logger } = require('../utils/logger')

const ENTITY = {
    MANAGEMENT : { name: 'management', value: 'management' },
    TENANT     : { name: 'tenant', value: 'tenant' },
}

const ACTION = {
    UP     : { name: 'up', value: 'up' },
    DOWN   : { name: 'down', value: 'down' },
    CREATE : { name: 'create', value: 'create' },
    STATUS : { name: 'status', value: 'status' },
}

async function run() {

    try {

        let output = ''
        const { entity, action } = await inquirer
            .prompt( [
                {
                    type     : 'rawlist',
                    name     : 'entity',
                    message  : 'select a entity',
                    choices  : Object.values(ENTITY),
                    validate : (value) => !!value,
                },
                {
                    type     : 'rawlist',
                    name     : 'action',
                    message  : 'choose your action',
                    choices  : Object.values(ACTION),
                    validate : (value) => !!value,
                },
            ] )

        let migration = ''
        if (action === ACTION.CREATE.value) {

            const { migrationName } = await inquirer
                .prompt( [
                    {
                        type     : 'input',
                        name     : 'migrationName',
                        message  : 'enter the name of migration to create',
                        validate : (value) => !!value,
                    },
                ] )

            migration = migrationName.trim()

        }

        if (entity === ENTITY.MANAGEMENT.value) {

            output = shell(`node ./migrations/migrate.management.js ${action} ${migration}`, { encoding: 'utf-8' } )

        }
        else if (entity === ENTITY.TENANT.value) {

            const { tenant } = await inquirer
                .prompt( [
                    {
                        type     : 'input',
                        name     : 'tenant',
                        message  : 'enter the tenant name',
                        default  : 'test',
                        validate : (value) => !!value,
                    },
                ] )

            output = shell(`node ./migrations/migrate.tenant.js ${action} ${migration} --tenant ${tenant}`, { encoding: 'utf-8' } )

        }

        logger.info(output)
        process.exit(0)

    }
    catch (error) {

        logger.error(error)
        process.exit(1)

    }

}

run()
