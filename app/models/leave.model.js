const mongoose = require('mongoose');

const LeaveSchema = mongoose.Schema({
    eamil: { type: String , required: true },
    from: { type: Number , required: true },
    to: { type: Number , required: true },
    total: { type: Number , required: true },
    comments: { type: String , required: true },
});

module.exports = mongoose.model('Leave', LeaveSchema);