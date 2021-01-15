const mongoose = require('mongoose');

const HolidaySchema = mongoose.Schema({
    date: { type: Date },
    day: { type: String },
    particulars: { type: String }
},{
    timestamp: true
});

module.exports = mongoose.model('Holiday', HolidaySchema);