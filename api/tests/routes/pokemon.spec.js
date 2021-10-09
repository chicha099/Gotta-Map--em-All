/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
// const { INET } = require('sequelize/types');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('GET /types', () => {
    it('should return all types', async () => {
      const result = await agent.get('/types');
      expect(result.body).to.have.length(20)
    })
  })

  describe('GET /pokemons/:id', () => {
    it('should return the detailed info of a given clefable', async () => {
      const result = await agent.get('/pokemons/36');
      expect(result.body).to.eql([
        {
          "name": "clefable",
          "types": [
            "fairy"
          ],
          "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/36.png",
          "hp": 95,
          "force": 70,
          "defense": 73,
          "speed": 60,
          "id": 36,
          "weight": 400,
          "height": 13
        }
      ])
    })
  })

  describe('POST /pokemons', () => {
    it('should create a new pokemon', async () => {
      const result = await agent.post('/pokemons')
        .send({
          "Nombre": "testing test",
          "Tipos": [13, 14],
          "Imagen": "https://c.tenor.com/70U9gr6CUB4AAAAC/pikachu-pokemon.gif",
          "Vida": 76,
          "Fuerza": 250,
          "Defensa": 46,
          "Velocidad": 194,
          "Peso": 65,
          "Altura": 123
        });
    })
  })
});
