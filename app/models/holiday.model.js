const mongoose = require('mongoose');

const HolidaySchema = mongoose.Schema({
    date: { type: Number },
    title: { type: String },
    type: { type: Number },
    description: { type: String },
    created_by: { type: String },
    updated_by: { type: String }
},{
    timestamp: true
});

module.exports = mongoose.model('Holiday', HolidaySchema);