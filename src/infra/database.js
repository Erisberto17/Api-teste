const pgp = require('pg-promise')();

const db = pgp({
    user:"postgres",
    password:"mossoro123",
    host:"localhost",
    database:"api"
})

module.exports = db;
//pegando do banco de dados