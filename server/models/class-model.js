const mongoose = require('mongoose');

//class is meals name like breakfast and all
const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Class', classSchema);
