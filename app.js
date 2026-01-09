const express = require('express');
const app = express();

//Para que sirve:
//Convierte los datos JSON que llegan en las peticiones HTTP 
// (POST, PUT, etc.) en un objeto JavaScript accesible en req.body.
app.use(express.json());

//Middleware en 1 línea:
//Es una función que procesa la petición antes 
// de que llegue a su ruta final.

const usuarios = [
    {id:1,nombre: 'Katherine'},
    {id:2,nombre: 'Nicolas'},
    {id:3,nombre: 'Jeremy'},
    {id:4,nombre: 'Hernan'},
]

app.get('/', (req,res) => {
    res.send('Hola Mundo desde Express');
}); //Peticion

app.get('/api/usuarios', (req,res) => {
    res.send(['katherine','nicolas','hernan','jeremy']);
});


app.get('/api/usuarios/:id',(req,res) => {
    let usuario = usuarios.find((u) => {
        return u.id === parseInt(req.params.id);
    });
    if(!usuario){
        return res
            .status(404)
            .send('El usuario no fue encontrado');
    }
    res.send({        
        usuario,
        statusCode : 200
    });
})

app.post('/api/usuarios', (req,res) => {
    if(!req.body.nombre || req.body.nombre.length <= 2){
        //Bad request
        res.status(400).send("Debe ingresar un nombre, que tenga un minimo de 3 letras");
        return;
    }
    const usuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre
    };
    usuarios.push(usuario);
    res.send(usuarios);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
}); //Puerto