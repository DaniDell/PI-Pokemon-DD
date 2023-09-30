const { Pokemon, Type } = require("../../db");
const { Sequelize } = require('sequelize');
const axios = require("axios");


const cleanArray = async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=175`);
    const pokemonData = response.data.results;

    // Mapea los resultados de la API a promesas individuales
    const pokePromises = pokemonData.map((pokemonInfo) => axios.get(pokemonInfo.url));
    // Espera a que todas las promesas se resuelvan
    const rawAllPokemon = await Promise.all(pokePromises);

    // Mapea los datos en bruto a un formato procesado
    const processedPokemons = rawAllPokemon.map((e) => {
      return {
        id: e.data.id,
        name: e.data.name,
        imagen: e.data.sprites.other['home'].front_default,
        vida: e.data.stats.find(stat => stat.stat.name === 'hp').base_stat,
        ataque: e.data.stats.find(stat => stat.stat.name === 'attack').base_stat,
        defensa: e.data.stats.find(stat => stat.stat.name === 'defense').base_stat,
        velocidad: e.data.stats.find(stat => stat.stat.name === 'speed').base_stat,
        altura: e.data.height,
        peso: e.data.weight,
        types: e.data.types.map((type) => {
          return { tipo: type.type.name };
        }),};
    });

    return processedPokemons;
  } catch (error) { 
    console.error("Error en cleanArray:", error);
    throw error; 
  }
};


const getAllPokemons = async (name, searchType) => {
  try {
    let filter = {}; 

    if (name) {
      // Si se proporciona el name, configura el filtro para buscar por name
      filter = { where: { name: { [Sequelize.Op.like]: `%${name}%` },}, };
    }

    // Realiza una consulta para obtener todos los Pokémon de la base de datos
    const dbPokemons = await Pokemon.findAll({
      ...filter,
      include: [
        {
          model: Type,
          as: 'Types',
          attributes: ['tipo'],
        },
      ],
    });

    // API normalizada por cleanArray
    const apiPokemons = await cleanArray();

    const adjustedDbPokemons = dbPokemons.map(pokemon => {
      const { Types, ...pokemonWithoutTypes } = pokemon.toJSON();
      return {
        ...pokemonWithoutTypes,
        types: Types.map(type => ({ tipo: type.tipo })),
      };
    });
    
      

    let combinedPokemons = [...adjustedDbPokemons, ...apiPokemons];

    if (searchType === 'name' && name) {
      // Si se está buscando por name y se proporciona un name, filtra por name
      combinedPokemons = combinedPokemons.filter(pokemon => pokemon.name.includes(name));
    }

    return combinedPokemons;
  } catch (error) {
    console.error("Error en getAllPokemons:", error);
    throw error; // Propaga el error hacia arriba
  }
};



const createPokemon = async (name, imagen, vida, ataque, defensa, velocidad, altura, peso, tipos) => {
  try {
    // Obtener los registros de tipos correspondientes a partir de los nombres de tipos
    const typeRecords = await Type.findAll({ where: { tipo: tipos } });

    // Crear el Pokémon en la tabla "Pokemon" con la asociación a tipos
    const newPokemon = await Pokemon.create({ name, imagen, vida, ataque, defensa, velocidad, altura, peso });

    // Crear un array de promesas para asociar tipos
    const typePromises = typeRecords.map(async (typeRecord) => {
      await newPokemon.addTypes(typeRecord); // Asociar un tipo a la vez
    });

    // Esperar a que se completen todas las promesas de asociación de tipos
    await Promise.all(typePromises);

    console.log("Pokemon created with types associated successfully"); 

    return newPokemon;
  } catch (error) { throw new Error("Error al crear el Pokémon: " + error.message);}
};


const getPokemonById = async (id, source) => {
  try {
    let pokemon;

    if (source === "api") {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      pokemon = response.data;
    } else {
      pokemon = await Pokemon.findByPk(id, {include: 'Types'}); //registros DB asociados con tipos
    }

    let typesData = [];
    if (source === "api") {
      if (pokemon.types && Array.isArray(pokemon.types)) {
        typesData = pokemon.types.map((type) => ({ tipo: type.type.name }));
      }
    } else {
      if (pokemon.Types && Array.isArray(pokemon.Types)) { // Ajusta a pokemon.Types para registros DB
        typesData = pokemon.Types.map((type) => ({ tipo: type.tipo}));
      }
    }

    const pokemonOk = {
      id: pokemon.id,
      name: pokemon.name,
      imagen: source === "api" ? pokemon.sprites.other.home.front_default : pokemon.imagen,
      vida: source === "api" ? pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat : pokemon.vida,
      ataque: source === "api" ? pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat : pokemon.ataque,
      defensa: source === "api" ? pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat : pokemon.defensa,
      velocidad: source === "api" ? pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat : pokemon.velocidad,
      altura: source === "api" ? pokemon.height : pokemon.altura,
      peso: source === "api" ? pokemon.weight : pokemon.peso,
      types: typesData,
    };

    return pokemonOk;
  } catch (error) {
    console.error("Error al obtener el Pokémon", error);
    throw error;
  }
};


module.exports = { createPokemon, getPokemonById,  getAllPokemons };