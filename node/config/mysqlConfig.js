const mysql = require('mysql-await');
const logger = require('../logger');
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'nodeapp'
});

connection.connect(function(err){
    if(!err)
        logger.info('MySql DataBase connected');
    else
        logger.error('Error while connecting to database');
});

module.exports = connection;