const conexion = require('../public/psql');
const controller = {}

controller.index = (req, res) =>{
    res.render('index');
}

controller.map = (req,res)=>{
    res.render('map')
}

controller.users = async (req, res)=>{
    res.render('user');
    //const output = await conexion.query('Select gid, nombre from areaprotegida');
    //console.log(output.rows);
    //conexion.end();
}
module.exports=controller;
