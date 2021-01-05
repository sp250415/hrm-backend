const auth = require('../controllers/login.controller');

module.exports = function(express) {

    express
    .post('/login', auth.login);

}