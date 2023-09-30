const { Pokemon, conn } = require('../../db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch((error) => {
            // Verificar que el error lanzado es el esperado
            expect(error.message).to.include("notNull Violation: pokemon.name cannot be null");
            done();
          });
      });
      it('should work when its a valid name', () => {
        return Pokemon.create({ name: 'Pikachu' })
          .then((pokemon) => {
            expect(pokemon.name).to.equal('Pikachu'); // Asegura que el name sea correcto
          });
      });
    });
  });
});
