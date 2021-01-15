const holiday = require('../controllers/holiday.controller.js');
const jwt = require('../util');

module.exports = function(express) {

    // Create a new holiday
    express
    .post('/holiday',jwt, holiday.create);

    // Retrieve all holidays
    express
    .get('/holidays',jwt, holiday.findAll);

    // Delete a holiday with holidayId
    express
    .delete('/holiday/:leaveId',jwt, holiday.delete);
}
