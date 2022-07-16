const {Pool} = require('pg');

const config = {
    user: 'postgres',
    host: 'localhost',
    password: 'anmon',
    database: 'proyectofinal',
}

const pool = new Pool(config);

/*const getAreas = async() => {
    const res = await pool.query('Select gid, nombre from areaprotegida');
    console.log(res.rows);
    pool.end();
}*/

module.exports=pool;