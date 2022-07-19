const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const session  = require('express-session');
const { sesion } = require('./controller');

// init 
const app = express();

//sets
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//req.body 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'secretkey',
    resave: false,
    saveUninitialized: false,
}))

//rutas
app.use(require('./routes/'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

// init server
app.listen(3000, () => {
    console.log('Server on port 3000');
});


