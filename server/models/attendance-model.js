const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: {
        type: Number,
        ref: 'User',
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },//meals name
    bookingDate: {
        type: Date,
        // default: Date.now
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true
    }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
