const leave = require('../controllers/leave.controller.js');

module.exports = function(express) {

    // Create a new leave
    express
    .post('/leave', leave.create);

    // Retrieve all leaves
    express
    .get('/leaves', leave.findAll);

    // Delete a leave with leaveId
    express
    .delete('/leave/:leaveId', leave.delete);
}