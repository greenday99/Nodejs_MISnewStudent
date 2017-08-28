var mysql = require('mysql');

var con = mysql.createPool({
	host		: 'localhost',
	user		: 'root',
	password	: '123456',
	database	: 'fju'
});

module.exports = con;