var mysql = require('mysql');

const pool =mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "bank",
    connectionLimit: 50
})

module.exports=pool; 