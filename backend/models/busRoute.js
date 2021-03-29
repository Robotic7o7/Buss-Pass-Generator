const mongoose = require('mongoose')

const busRouteSchema = mongoose.Schema({

    routeNo: {
        type: String
    },

    inchargeName: {
        type: String
    },

    inchargeNumber: {
        type: String
    },

    startPoint: {
        type: String
    },

    status: {
        enum: ["ACTIVE", "INACTIVE", null]
    }
})

module.exports = mongoose.model('busRoute', busRouteSchema)