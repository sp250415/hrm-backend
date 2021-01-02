const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: String,
    salary: Number
},{
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);