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
                    let listURl = allPokemonsRaw.map(p => p.url);
                    let listPromises = listURl.map(url => axios.get(url));
                    Promise.all(listPromises)
                        .then(finalResp => {
                            let allPokesData = finalResp.map(p => p.data);
                            let finalData = [];
                            for (let i = 0; i < allPokesData.length; i++) {
                                let name = allPokesData[i].name;
                                //finalResp[i].types
                                let types = allPokesData[i].types.map(t => t.type.name);
                                let img = allPokesData[i].sprites.other['official-artwork'].front_default;
                                finalData.push({ name, types, img })
                            }
                            return res.json(finalData)
                        })
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