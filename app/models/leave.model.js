const mongoose = require('mongoose');

const LeaveSchema = mongoose.Schema({
    eamil: { type: String },
    from: { type: Number },
    to: { type: Number },
    total: { type: Number },
    comments: { type: String },
});

module.exports = mongoose.model('Leave', LeaveSchema);