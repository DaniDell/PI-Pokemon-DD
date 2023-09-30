const { Router } = require('express');
const { getPokemonHandler, getPokemonIdHandler, createPokemonHandler } = require('./Handlers/pokemonHandler');

const pokemonRouter = Router();

pokemonRouter.get("/", getPokemonHandler); 

pokemonRouter.get("/:id", getPokemonIdHandler); 

pokemonRouter.post("/", createPokemonHandler); 

module.exports = pokemonRouter;