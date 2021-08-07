'use strict'

var Pokemon = require('../models/pokemon');
var fs = require('fs');
var path = require('path');

var controller = {
	
	home: function(req, res){
		return res.status(200).send({
			message: 'Soy la home'
		});
	},

	test: function(req, res){
		return res.status(200).send({
			message: "Soy el metodo o accion test del controlador de pokemon"
		});
	},

	savePokemon: function(req, res){
		var pokemon = new Pokemon();

		var params = req.body;
		pokemon.nombre = params.nombre;
		pokemon.altura = params.altura;
		pokemon.peso = params.peso;
		pokemon.habilidad = params.habilidad;
		pokemon.sexo = params.sexo;
		pokemon.image = null;

		pokemon.save((err, pokemonStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el pokemon.'});

			if(!pokemonStored) return res.status(404).send({message: 'No se ha podido guardar el pokemon.'});

			return res.status(200).send({pokemon: pokemonStored});
		});
	},

	getPokemon: function(req, res){
		var pokemonId = req.params.id;

		if(pokemonId == null) return res.status(404).send({message: 'El pokemon no existe.'});

		Pokemon.findById(pokemonId, (err, pokemon) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!pokemon) return res.status(404).send({message: 'El pokemon no existe.'});

			return res.status(200).send({
				pokemon
			});

		});
	},

	getPokemons: function(req, res){

		Pokemon.find({}).sort('-year').exec((err, pokemons) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!pokemons) return res.status(404).send({message: 'No hay pokemones que mostrar.'});

			return res.status(200).send({pokemons});
		});

	},

	updatePokemon: function(req, res){
		var pokemonId = req.params.id;//Capturar ese valor que nos llega por la url
		var update = req.body;

		Pokemon.findByIdAndUpdate(pokemonId, update, {new:true}, (err, pokemonUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!pokemonUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

			return res.status(200).send({
				pokemon: pokemonUpdated
			});
		});

	},

	deletePokemon: function(req, res){
		var pokemontId = req.params.id;

		Pokemon.findByIdAndRemove(pokemontId, (err, pokemonRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

			if(!pokemonRemoved) return res.status(404).send({message: "No se puede eliminar ese proyecto."});

			return res.status(200).send({
				pokemon: pokemonRemoved
			});
		});
	},

	uploadImage: function(req, res){
		var pokemonId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Pokemon.findByIdAndUpdate(pokemonId, {image: fileName}, {new: true}, (err, pokemonUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!pokemonUpdated) return res.status(404).send({message: 'El pokemon no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						pokemon: pokemonUpdated
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}

	},

	getImageFile: function(req, res){
		var file = req.params.image;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}

};

module.exports = controller;