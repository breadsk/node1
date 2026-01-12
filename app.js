const debug = require('debug')('app:inicio');
//const dbDebug = require('debug')('app:db');
const express = require('express');
const config = require('config');
//const logger = require('./logger');
const morgan = require('morgan');
const app = express();
const usuarios = require('./routes/usuarios');


//Para que sirve:
//Convierte los datos JSON que llegan en las peticiones HTTP 
// (POST, PUT, etc.) en un objeto JavaScript accesible en req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/usuarios', usuarios);

//Middleware en 1 línea:
//Es una función que procesa la petición antes 
// de que llegue a su ruta final.


// app.use(function(req,res,next){
//     console.log("Autenticando....");
//     next();
// })


//Configuracion de entornos
//console.log('Entorno detectado por config:', config.util.getEnv('NODE_ENV'));

console.log(`Aplicacion: ${config.get('nombre')}`);
console.log(`DB server: ${config.get('configDB.host')}`);


if(app.get('env') === 'development'){
    //Uso de middleware de terceros
    //Para ir probando los tiempos de respuesta
    app.use(morgan('tiny'));
    //console.log("Morgan Habilitado");
    debug('Morgan está habilitado');
}

//Trabajos con la base de datos
debug('Conectando con la base de datos...');



app.get('/', (req,res) => {
    res.send('Hola Mundo desde Express');
}); //Peticion



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
}); //Puerto



