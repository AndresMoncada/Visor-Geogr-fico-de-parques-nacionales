const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const session  = require('express-session');
const flash = require('express-flash')
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

//sessions
app.use(session({
    secret:'secretkey',
    resave: false,
    saveUninitialized: false,
}))

app.use(flash())

//rutas
app.use(require('./routes/'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

// init server
app.listen(3000, () => {
    console.log('Server on port 3000');
});


