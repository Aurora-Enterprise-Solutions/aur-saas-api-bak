const { program } = require('commander')
const { version } = require('../../package.json')

function runProgram( { description, isTenant = false } ) {

    program
        .description(description)
        .version(`v${version}`, '-v, --version', 'output the current version')

    if (isTenant)
        program.requiredOption('--tenant <name>', 'set the tenant')


    program
        .command('up')
        .description('migrate the database up')

    program
        .command('down')
        .description('migrate the database down')

    program
        .command('status')
        .description('check the status if the migrations')

    program
        .command('create <name>')
        .description('create a new migration')

    program.parse(process.argv)

    return program

}

module.exports = runProgram
