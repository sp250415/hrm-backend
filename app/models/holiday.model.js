const mongoose = require('mongoose');

const HolidaySchema = mongoose.Schema({
    date: { type: Date , required: true },
    title: { type: String , required: true },
    type: { type: Number , required: true },
    description: { type: String , required: true },
    created_by: { type: String , required: true },
    updated_by: { type: String , required: true }
},{
    timestamp: true
});

module.exports = mongoose.model('Holiday', HolidaySchema);