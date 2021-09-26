const { Router } = require("express");
const { fetch } = require("node-fetch");
const { Pokemon } = require("../db.js");

const router = Router();

// router.get('/', async (req, res) => {
//     try {
//         const api = await fetch('https://pokeapi.co/api/v2/pokemon');
//         const apiJson = api.json();
//         const boldPokeArray = apiJson.results;
//         return res.json(boldPokeArray);
//     } catch (error) {
//         console.log(error)
//     }
// })

module.exports = router;