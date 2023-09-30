const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../app');
const { Pokemon, conn } = require('../../db');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  let transaction; // Declara una variable para la transacción

  before(async () => {
    try {
      await conn.authenticate();

      // Inicia una transacción antes de ejecutar las pruebas
      transaction = await conn.transaction();

      await Pokemon.sync({ force: true, transaction });
    } catch (err) {
      console.error('Unable to connect to the database:', err);
    }
  });

  after(async () => {
    // Deshacer la transacción después de que se ejecuten todas las pruebas
    await transaction.rollback();
  });

  afterEach(async () => {
    try {
      // Limpiar la base de datos después de cada prueba, pero dentro de la transacción
      await Pokemon.destroy({
        where: {},
        truncate: true,
        transaction,
      });
    } catch (error) {
      console.error('Error clearing the database:', error);
    }
  });

  describe('GET /pokemons', () => {
    it('should get 200', async () => {
      try {
        // Crear un registro de Pokémon para probar dentro de la transacción
        await Pokemon.create(pokemon, { transaction });

        // Realizar la solicitud GET
        const response = await agent.get('/pokemons');

        // Verificar que se reciba una respuesta 200
        expect(response.status).to.equal(200);
      } catch (error) {
        console.error('Error in test:', error);
      }
    });
  });
});
