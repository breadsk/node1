const express = require('express');
const app = express();


app.get('/', (req,res) => {
    res.send('Hola Mundo desde Express');
}); //Peticion

app.get('/api/usuarios', (req,res) => {
    res.send(['katherine','nicolas','hernan','jeremy']);
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
}); //Puerto