const { Router } = require("express");
const axios = require('axios');
const { Tipo } = require("../db.js");
const { all } = require("./pokemons.js");

const router = Router();

router.get("/", (req, res) => {
    axios.get("https://pokeapi.co/api/v2/type")
        .then(resp => {
            let allTypesRaw = resp.data.results;
            let allTypesFinal = [];
            for (let i = 0; i < allTypesRaw.length; i++) {
                let typeName = { name: allTypesRaw[i].name };
                allTypesFinal.push(typeName)
            }
            Tipo.findAll()
                .then(respCheck => {
                    let tableCheck = respCheck;
                    if (!tableCheck.length) {
                        Tipo.bulkCreate(allTypesFinal)
                    }
                })
                .catch(err => {
                    res.send(err)
                });
        })
        .catch(err => {
            res.send(err)
        });
})

module.exports = router;