const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const connection = mysql.createPool(process.env.MYSQL_SERVER);
module.exports = connection;