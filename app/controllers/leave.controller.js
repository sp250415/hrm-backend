const Leave = require('../models/leave.model.js');

// Create and Save a new Leave
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Leave content can not be empty"
        });
    }

    // Create a Leave
    const leave = new Leave({
        eamil : req.body.eamil,
        from : req.body.from,
        to : req.body.to,
        total : req.body.total,
        comments : req.body.comments
    });

    // Save Leave in the database
    leave.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Leave."
        });
    });
};


// Retrieve and return all Leaves from the database.
exports.findAll = (req, res) => {
    Leave.find()
    .then(Leaves => {
        res.send(Leaves);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Leaves."
        });
    });
};


// Find a single Leave with a LeaveId
exports.findOne = (req, res) => {
    Leave.findById(req.params.leaveId)
    .then(userleave => {
        if(!userleave) {
            return res.status(404).send({
                message: "Leave not found " + req.params.leaveId
            });            
        }
        res.send(userleave);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Leave not found with id " + req.params.leaveId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Leave with id " + req.params.leaveId
        });
    });
};

// Delete a Leave with the specified LeaveId in the request
exports.delete = (req, res) => {
    Leave.findByIdAndRemove(req.params.leaveId)
    .then(Leave => {
        if(!Leave) {
            return res.status(404).send({
                message: "Leave not found with id " + req.params.leaveId
            });
        }
        res.send({message: "Leave deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Leave not found with id " + req.params.leaveId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Leave with id " + req.params.leaveId
        });
    });
};