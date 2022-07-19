const {Pool} = require('pg');

const config = {
    user: 'postgres',
    host: 'localhost',
    password: 'Crjnh0805',
    database: 'proyectofinal1',
}

const pool = new Pool(config);

module.exports=pool;