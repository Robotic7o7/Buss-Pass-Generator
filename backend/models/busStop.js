const mongoose = require('mongoose')

const busStopSchema = mongoose.Schema({

    routeNo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "busroutes"
    },

    area: {
        type: String
    },

    designatedStop: {
        type: String
    },

    status: {
        enum: ["ACTIVE", "INACTIVE", null]
    }
})

module.exports = mongoose.model('busStop', busStopSchema)