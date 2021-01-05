const Login = require('../models/login.model');
const Employee = require('../models/employee.model.js');
var jwt = require('jsonwebtoken');


// Login
exports.login = (req, res) => {
    console.log(req.body)
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Leave content can not be empty"
        });
    }

    Employee.findOne({'email':req.body.email})
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "Employee not found "
            });            
        }
        
        let token = jwt.sign({ userId: emp._id }, 'hrm');
        emp.token = token;
        console.log(emp);
         res.send(emp);
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
