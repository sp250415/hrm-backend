const leave = require('../controllers/leave.controller.js');
const jwt = require('../util');
module.exports = function(express) {

    // Create a new leave
    express
    .post('/leave',jwt, leave.create);

    // Retrieve all leaves
    express
    .get('/leaves',jwt, leave.findAll);

    // Delete a leave with leaveId
    express
    .delete('/leave/:leaveId',jwt, leave.delete);
}
