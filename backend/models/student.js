const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    emailID: {
        type: String
    },

    rollnumber: {
        type: String
    },

    branch: {
        type: String
    },

    section: {
        type: String
    },

    busStop: {
        type: String
    },

    routeNo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "busroutes"
    },

    status: {
        enum: ["ACTIVE", "INACTIVE", null]
    }
})

module.exports = mongoose.model('student', studentSchema)