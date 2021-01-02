const Employee = require('../models/employee.model.js');

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request
    console.log(req)
    if(!req.body) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    // Create a Employee
    const employee = new Employee({
        title: req.body.title || "Untitled Employee", 
        content: req.body
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
    Employee.findById(req.params.EmployeeId)
    .then(Employee => {
        if(!Employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.EmployeeId
            });            
        }
        res.send(Employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.EmployeeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Employee with id " + req.params.EmployeeId
        });
    });
};


// Update a Employee identified by the EmployeeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    // Find Employee and update it with the request body
    Employee.findByIdAndUpdate(req.params.EmployeeId, {
        title: req.body.title || "Untitled Employee",
        content: req.body.content
    }, {new: true})
    .then(Employee => {
        if(!Employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.EmployeeId
            });
        }
        res.send(Employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.EmployeeId
            });                
        }
        return res.status(500).send({
            message: "Error updating Employee with id " + req.params.EmployeeId
        });
    });
};


// Delete a Employee with the specified EmployeeId in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.EmployeeId)
    .then(Employee => {
        if(!Employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.EmployeeId
            });
        }
        res.send({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.EmployeeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Employee with id " + req.params.EmployeeId
        });
    });
};