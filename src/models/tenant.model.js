const mongoose = require('mongoose')
const defaultModelOptions = require('./options/default')
const { toJSON } = require('./plugins')

const tenantSchema = mongoose.Schema(
    {
        name: {
            type     : String,
            required : true,
        },
        cdn: {
            type     : String,
            required : true,
            index    : true,
        },
        active: {
            type     : Boolean,
            required : false,
            default  : false,
        },
    },
    {
        ...defaultModelOptions,
        timestamps : true,
        collection : 'tenants',
    },
)

// add plugin that converts mongoose to json
tenantSchema.plugin(toJSON)

module.exports = {
    name   : 'Tenant',
    schema : tenantSchema,
}
