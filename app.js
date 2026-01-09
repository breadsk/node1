const express = require('express');
const app = express();
const Joi = require('joi');

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
    res.send(usuarios);
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

    const schema = Joi.object({
        nombre: Joi.string().min(3).max(30).required()
    });

    const { error , value } = schema.validate({ nombre: req.body.nombre });
    
    if(!error){
        const usuario = {
            id: usuarios.length + 1,
            nombre: value.nombre
        };
        usuarios.push(usuario);
        res.send(usuarios);
    }else{
        res.status(400).send(error.details[0].message);
    }
});

app.put('/api/usuarios/:id', (req,res) => {
    //Encontrar si existe el usuario
    let usuario = usuarios.find((u) => ( u.id === parseInt(req.params.id)));
    if(!usuario) return res.status(404).send('El usuario no fue encontrado');
    
    const schema = Joi.object({
        nombre: Joi.string().min(3).max(30).required()
    });

    const { error , value } = schema.validate({ nombre: req.body.nombre });
    
    if(error){
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
        return;
    }

    usuario.nombre = value.nombre;
    res.send(usuario);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
}); //Puerto