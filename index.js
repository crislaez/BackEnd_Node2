const express = require('express');
const endPoint = require('./Routes/Router');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//para poder coger la ruta de la carpeta htt://localhost:3001/img/nombrefoto.jpg
app.use('/img', express.static(__dirname + '/img', {
    maxAge: '12h'
}));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  //el * se cambiara y se pondra la url permitida
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//esta funcion esta en el fichero rutas, donde estan todos los endpoint dentro
endPoint(app);

//hacemos la conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/prueba', {useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
    if(err) return console.log(`error al conectarse a la base de datos:${err}`);

    app.listen(port, () => {
        console.log(`Api Rest corriendo en http://localhost:${port}`);
    })
})