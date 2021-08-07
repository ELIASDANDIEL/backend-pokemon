'use strict'

var express = require('express');
var PokemonController = require('../controllers/pokemon');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', PokemonController.home);
router.post('/test', PokemonController.test);
router.post('/save-pokemon', PokemonController.savePokemon);
router.get('/pokemon/:id?', PokemonController.getPokemon);
router.get('/pokemons', PokemonController.getPokemons);
router.put('/pokemon/:id', PokemonController.updatePokemon);
router.delete('/pokemon/:id', PokemonController.deletePokemon);
router.post('/upload-image/:id', multipartMiddleware, PokemonController.uploadImage);
router.get('/get-image/:image', PokemonController.getImageFile);

module.exports = router;