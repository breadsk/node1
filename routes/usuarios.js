const express = require('express');
const router = express.Router();
const Joi = require('joi');

const usuarios = [
    {id:1,nombre: 'Katherine'},
    {id:2,nombre: 'Nicolas'},
    {id:3,nombre: 'Jeremy'},
    {id:4,nombre: 'Hernan'},
]

router.get('/', (req,res) => {
    res.send(usuarios);
});


router.get('/:id',(req,res) => {
    let usuario = existeUsuario(req.params.id);
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

router.post('/', (req,res) => {
    
    const { error , value } = validarUsuario(req.body.nombre);
    
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

router.put('/:id', (req,res) => {
    //Encontrar si existe el usuario    
    let usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send('El usuario no fue encontrado');
        return;
    }

    const { error , value } = validarUsuario(req.body.nombre);    
    if(error){
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
        return;
    }

    usuario.nombre = value.nombre;
    res.send(usuario);
});

router.delete('/:id', (req,res) => {
    //Encontrar si existe el usuario    
    let usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send('El usuario no fue encontrado');
        return;
    }

    const index = usuarios.indexOf(usuario);
    usuarios.splice(index, 1);
    res.send(usuario).json(
        {
            mensaje: 'Usuario eliminado'
        });
});

function existeUsuario(id){
    return usuarios.find((u) => u.id === parseInt(id));
}
    
function validarUsuario(nom){
    const schema = Joi.object({
        nombre: Joi.string().min(3).max(30).required()
    });
    return schema.validate({ nombre: nom });
}

module.exports = router;