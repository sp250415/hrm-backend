const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: { type: String , required: true },
    email: { type: String , required: true } , 
    password: { type: Number , required: true } , 
    isAdmin: { type: String , default: false } ,
    contact: { type: Number , required: true },
    role: { type: String , required: true },
    team: { type: String , required: true },
    salary: { type: Number , required: true },
});

module.exports = mongoose.model('Employee', EmployeeSchema);