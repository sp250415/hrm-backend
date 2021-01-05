const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String } , 
    password: { type: String } , 
    isAdmin: { type: String } ,
    contact: { type: Number },
    role: { type: String },
    team: { type: String },
    salary: { type: Number },
});

module.exports = mongoose.model('Employee', EmployeeSchema);