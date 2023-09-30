const { createPokemon, getPokemonById, getAllPokemons } = require("../Controlers/PokemonControl");


const retryDelay = 1000; 
const maxRetries = 3; // reintentos permitidos porque la API se bloquea si se hacen peticions muy seguido

const getPokemonHandler = async (req, res) => {
  let retries = 0;
  let pokemons = [];

  while (retries < maxRetries) {
    try {
      const { name } = req.query;
      const searchType = name ? 'name' : 'all'; 
      pokemons = await getAllPokemons(name, searchType);
      
      if (pokemons.length === 0) {
        const errorMessage = searchType === 'name'
          ? `No se encontraron Pokémon con el nombre '${name}'.`
          : 'No se encontraron Pokémon.';
        
        if (searchType === 'name') {
          res.status(404).json({ error: errorMessage });
          return;
        }
      } else {
        res.status(200).json(pokemons);
        return; // solicitud fue exitosa.
      }
    } catch (error) {
      console.error(error);
      retries++;
      if (retries < maxRetries) {
        console.log(`Reintentando en ${retryDelay / 1000} segundos...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  // Si llegamos aquí, significa que se agotaron los reintentos sin éxito.
  if (req.query.name) {
    res.status(404).json({ error: `No se encontraron Pokémon con el nombre '${req.query.name}'.` });
  } else {
    res.status(404).json({ error: 'No se encontraron Pokémon.' });
  }
};

const getPokemonIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";

  try {
    const pokemon = await getPokemonById(id, source);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPokemonHandler = async (req, res) => {
  const { name, imagen, vida, ataque, defensa, velocidad, altura, peso, types } = req.body;
  try {
    const tipoNombres = types.map(type => type.tipo);

    const newPokemon = await createPokemon(name, imagen,vida, ataque, defensa, velocidad, altura, peso, tipoNombres);

    // Carga los tipos asociados al nuevo Pokémon antes de enviar la respuesta
    await newPokemon.reload({ include: 'Types' });

    // Construye la respuesta JSON completa
    const response = {
      id: newPokemon.id,
      name: newPokemon.name,
      imagen: newPokemon.imagen,
      vida: newPokemon.vida,
      ataque: newPokemon.ataque,
      defensa: newPokemon.defensa,
      velocidad: newPokemon.velocidad,
      altura: newPokemon.altura,
      peso: newPokemon.peso,
      types: newPokemon.Types.map(type => ({ tipo: type.tipo })),
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: 'El nombre de Pokémon ya existe en la base de datos.' });
  }
};


module.exports = {
  getPokemonHandler,
  getPokemonIdHandler,
  createPokemonHandler
};



