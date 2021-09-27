const { Router } = require("express");
const axios = require('axios');
const { Pokemon } = require("../db.js");

const router = Router();

router.get("/", (req, res, next) => {
    axios.get('https://pokeapi.co/api/v2/pokemon')
        .then(resp => {
            const next = resp.data.next;
            const firstGet = resp.data.results;
            axios.get(next)
                .then(nextResp => {
                    const secondGet = nextResp.data.results;
                    const allPokemonsRaw = firstGet.concat(secondGet);
                    for (let i = 0; i < allPokemonsRaw.length; i++) {
                        axios.get(allPokemonsRaw[i].url)
                            .then(infoResp => {
                                res.json(infoResp.data)
                            })
                    }
                })
                .catch(err => {
                    res.send(err)
                });
        })
        .catch(err => {
            res.send(err)
        });
});



module.exports = router;