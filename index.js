const express = require('express');
const routes = require('./routes');
const path = require('path')
const bodyParser = require('body-parser')

// helpers con algunas funciones
const helpers = require('./helpers')

// Crear la conexión a la BD
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos')

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error))

// Crear app de express
const app = express();

// Donde cargar los archivos estaticos
app.use(express.static('public'));

// Habilitar Pug (TEMPLATE ENGINE)
app.set('view engine', 'pug');

// Añadir carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Enviar vardump a la aplicacion
app.use((request, response, next) => {
    response.locals.vardump = helpers.vardump;
    next();
});

// Entendiendo Middleware
app.use((request, response, next) => {
    console.log("Soy el middleware");
    next();
});

// Habilitar bodyParser para leer datos de formulario
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes());

// Indicar en cual puerto quiere que se corra
app.listen(3000);