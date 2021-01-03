const Holiday = require('../models/holiday.model.js');

// Create and Save a new Holiday
exports.create = (req, res) => {
    // Validate request
    console.log(req)
    if(!req.body) {
        return res.status(400).send({
            message: "Holiday content can not be empty"
        });
    }

    // Create a Holiday
    const holiday = new Holiday({
        date : req.body.date,
        title : req.body.title,
        type : req.body.type,
        description : req.body.description,
        created_by : req.body.created_by,
        updated_by : req.body.updated_by
    });

    // Save Holiday in the database
    holiday.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Holiday."
        });
    });
};


// Retrieve and return all Employees from the database.
exports.findAll = (req, res) => {
    Holiday.find()
    .then(Employees => {
        res.send(Employees);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Employees."
        });
    });
};


// Find a single Holiday with a EmployeeId
exports.findOne = (req, res) => {
    Holiday.findById(req.params.employeeId)
    .then(emp => {
        if(!emp) {
            return res.status(404).send({
                message: "Holiday not found " + req.params.employeeId
            });            
        }
        res.send(emp);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Holiday not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Holiday with id " + req.params.employeeId
        });
    });
};


// Update a Holiday identified by the employeeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Holiday content can not be empty"
        });
    }

    // Find Holiday and update it with the request body
    Holiday.findByIdAndUpdate(req.params.holidayId, {
        date : req.body.date,
        title : req.body.title,
        type : req.body.type,
        description : req.body.description,
        created_by : req.body.created_by,
        updated_by : req.body.updated_by || req.body.created_by
    }, {new: true})
    .then(Holiday => {
        if(!Holiday) {
            return res.status(404).send({
                message: "Holiday not found with id " + req.params.holidayId
            });
        }
        res.send(Holiday);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Holiday not found with id " + req.params.holidayId
            });                
        }
        return res.status(500).send({
            message: "Error updating Holiday with id " + req.params.holidayId
        });
    });
};


// Delete a Holiday with the specified holidayId in the request
exports.delete = (req, res) => {
    Holiday.findByIdAndRemove(req.params.holidayId)
    .then(Holiday => {
        if(!Holiday) {
            return res.status(404).send({
                message: "Holiday not found with id " + req.params.holidayId
            });
        }
        res.send({message: "Holiday deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Holiday not found with id " + req.params.holidayId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Holiday with id " + req.params.holidayId
        });
    });
};