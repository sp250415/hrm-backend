const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: String,
    // username: String,
    // age: Number,
    // address: String,
    // team: String,
    // role: String,
    salary: Number
},{
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);