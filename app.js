const express = require('express');
const app = express();

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
        id: usuario.id,
        usuario,
        statusCode : 200
    });
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
}); //Puerto