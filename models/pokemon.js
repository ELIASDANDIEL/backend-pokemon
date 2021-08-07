'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PokemonSchema = Schema({
nombre: String,
altura:Number,
peso:Number,
habilidad:String,
sexo:String,
image: String
});
module.exports = mongoose.model('Pokemon', PokemonSchema);
//projects  ---> guarda los documentos en esa coleccion