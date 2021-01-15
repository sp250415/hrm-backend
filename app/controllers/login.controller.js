const Login = require('../models/login.model');
const Employee = require('../models/employee.model.js');
var jwt = require('jsonwebtoken');


// Login user
exports.login = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }
    
    Employee.findOne({'email':req.body.username})
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "Employee not found "
            });            
        }
        console.log(req.body.password === emp.password);
        if(req.body.password === emp.password){
            let responseData = {message:'Login Success',success:true,token:jwt.sign({ userId: emp._id }, 'hrm')}
             res.send(responseData);
        }else{
            let responseData = {message:'Login Failed'}
            res.send(responseData);
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Employee with id " + req.params.employeeId
        });
    });
};
