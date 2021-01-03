const holiday = require('../controllers/holiday.controller.js');

module.exports = function(express) {

    // Create a new holiday
    express
    .post('/holiday', holiday.create);

    // Retrieve all holidays
    express
    .get('/holidays', holiday.findAll);

    // Delete a holiday with holidayId
    express
    .delete('/holiday/:leaveId', holiday.delete);
}