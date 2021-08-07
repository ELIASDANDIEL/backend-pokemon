'use strict'
var express= require('express');
var bodyParser = require('body-parser');

var app = express();

//CARGAR ARCHIVOS DE RUTAS
var pokemon_routes = require('./routes/pokemon');
//MIDDLEWARES
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS

//RUTAS
app.use('/api', pokemon_routes);



//EXPORTAR 
module.exports= app;