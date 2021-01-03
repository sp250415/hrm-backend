const Employee = require('../models/employee.model.js');

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    // Create a Employee
    const employee = new Employee({
        name : req.body.name,
        salary : req.body.salary,
        email : req.body.email,
        password : req.body.password,
        isAdmin : req.body.isAdmin,
        contact : req.body.contact,
        role : req.body.role,
        team : req.body.team
    });

    // Save Employee in the database
    employee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Employee."
        });
    });
};


// Retrieve and return all Employees from the database.
exports.findAll = (req, res) => {
    Employee.find()
    .then(Employees => {
        res.send(Employees);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Employees."
        });
    });
};


// Find a single Employee with a EmployeeId
exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeId)
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "Employee not found " + req.params.employeeId
            });            
        }
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


// Update a Employee identified by the employeeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    // Find Employee and update it with the request body
    Employee.findByIdAndUpdate(req.params.employeeId, {
        name : req.body.name,
        salary : req.body.salary,
        email : req.body.email,
        password : req.body.password,
        isAdmin : req.body.isAdmin,
        contact : req.body.contact,
        role : req.body.role,
        team : req.body.team
    }, {new: true})
    .then(Employee => {
        if(!Employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.send(Employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error updating Employee with id " + req.params.employeeId
        });
    });
};


// Delete a Employee with the specified employeeId in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.employeeId)
    .then(Employee => {
        if(!Employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.send({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Employee with id " + req.params.employeeId
        });
    });
};