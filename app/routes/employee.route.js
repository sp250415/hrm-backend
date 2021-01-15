const employees = require('../controllers/employee.controller.js');
const jwt = require('../util');

module.exports = function(express) {

    // Create a new employee
    express
    .post('/employee', employees.create);

    // Retrieve all employees
    express
    .get('/employees', jwt, employees.findAll);

    // Retrieve a single employee with employeeId
    express
    .get('/employees/:employeeId', employees.findOne);

    // Update a employee with employeeId
    express
    .put('/employee/:employeeId', employees.update);

    // Delete a employee with employeeId
    express
    .delete('/employee/:employeeId', employees.delete);
}
