const pool = require('../public/psql');
const conexion = require('../public/psql');
const controller = {}

controller.index = (req, res) => {
    res.render('map');
}

controller.map = (req, res) => {
    res.render('map')
}

controller.sesion = (req, res) => {
    res.render('login')
}

controller.registro = (req, res) => {
    res.render('signup')
}

controller.registros = async (req, res) => {
    await pool.query('SELECT idregistro,opinion, nombre, calificacion, usuario FROM registrovisita INNER JOIN areaprotegida ON areaprotegida.gid = registrovisita.idarea ORDER BY idregistro asc')
        .then(projects => {
            res.render('registros', { registros: projects.rows });
        }).catch(err => {
            console.log(err);
            return res.status(500).send("Error obteniendo productos");
        });
}

/*controller.mregistros= (req,res) => {
    await pool.query('SELECT registrovisita.usuario, areaprotegida.nombre from registrovisita inner join ')
}*/

controller.users = async (req, res) => {
    res.render('registrovisita');
}

controller.visita = async (req, res) => {
    res.render('registrovisita')
}

controller.registrar = async (req, res) => {
    const { nombre, apellido, contraseña, correo } = req.body;
    await pool.query('INSERT INTO usuario (nombre, apellido, password, correo) VALUES ($1,$2,$3,$4)', [nombre, apellido, contraseña, correo])
    res.render('login')
}

controller.rvisita = async (req, res) => {
    const { objectid, usuario, opinion, calificacion } = req.body;
    const numgid = await pool.query('SELECT gid FROM areaprotegida WHERE objectid = $1', [objectid]);
    await pool.query('INSERT INTO registrovisita (opinion, idarea, calificacion, usuario) VALUES ($1,$2,$3,$4)', [opinion, numgid.rows[0].gid, calificacion, usuario])
    res.render('map')
}
module.exports = controller;
