// conectandome a la base de datos
const {baseDatos} = require('pg')
const bd = new baseDatos({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: '112358',
    port: 5432,
})

module.exports.bd = bd;
