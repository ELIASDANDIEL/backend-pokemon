'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
.then(() => {      
    console.log("Conexion a la base de datos establecida con exito ...");
    
    //CREACION DEL SERVIDOR
    app.listen(port,() => {
        console.log("Servidor  , corriendo correctamente en la url : localhost:3900");
    });
})
.catch(err => console.log(err));
