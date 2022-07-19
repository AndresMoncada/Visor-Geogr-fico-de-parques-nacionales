const pool = require('../public/psql');
const conexion = require('../public/psql');
const controller = {}

controller.index = (req, res) =>{
    res.render('index');
}

controller.map = (req,res)=>{
    res.render('map')
}

controller.sesion = (req,res) =>{
    res.render('login')
}  

controller.registro = (req,res) => {
    res.render('signup')
}
controller.users = async (req, res)=>{
    res.render('registrovisita');
}

controller.visita = async(req,res) =>{
    res.render('registrovisita')
}

controller.registrar = async (req,res)=>{
    const {nombre, apellido, contraseña, correo} = req.body;
    await pool.query('INSERT INTO usuario (nombre, apellido, password, correo) VALUES ($1,$2,$3,$4)', [nombre,apellido,contraseña,correo])
    res.render('login')
}

controller.rvisita = async (req,res)=>{
    const {nombre, opinion, calificacion} = req.body;
    console.log(nombre +" "+opinion + " "+ calificacion);
}
module.exports=controller;
