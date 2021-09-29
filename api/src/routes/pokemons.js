const { Router } = require("express");
const axios = require('axios');
const { Pokemon } = require("../db.js");

const router = Router();

router.get("/", (req, res, next) => {
    const { name } = req.query;
    if (name) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(resp => {
                let finalDetailed = [];
                let infoRaw = resp.data;
                finalDetailed.push({
                    Name: infoRaw.name,
                    Types: infoRaw.types.map(t => t.type.name),
                    Img: infoRaw.sprites.other['official-artwork'].front_default,
                    Hp: infoRaw.stats[0].base_stat,
                    Force: infoRaw.stats[1].base_stat,
                    Defense: infoRaw.stats[2].base_stat,
                    Speed: infoRaw.stats[5].base_stat,
                    Id: infoRaw.id,
                    Weight: infoRaw.weight,
                    Height: infoRaw.height,
                });
                return res.send(finalDetailed)
            })
    };
    axios.get('https://pokeapi.co/api/v2/pokemon')
        .then(resp => {
            const next = resp.data.next;
            const firstGet = resp.data.results;
            //Hasta aca me guardé todos los datos de los primeros 20 pokemons
            axios.get(next)
                .then(nextResp => {
                    const secondGet = nextResp.data.results;
                    const allPokemonsRaw = firstGet.concat(secondGet);
                    //Aca ya tengo los otros 20 pokemons y los concatené en un mismo array
                    let listURl = allPokemonsRaw.map(p => p.url);
                    let listPromises = listURl.map(url => axios.get(url));
                    //Armo la lista/array de URLs a las que voy a pedir la informacion detallada de cada pokemon y creo el array de dichos request
                    Promise.all(listPromises)
                        .then(finalResp => {
                            let allPokesData = finalResp.map(p => p.data);
                            //Aca tengo la informacion detallada de los 40 pokemons
                            let allPokemonsFinal = [];
                            for (let i = 0; i < allPokesData.length; i++) {
                                let name = allPokesData[i].name;
                                let types = allPokesData[i].types.map(t => t.type.name);
                                let img = allPokesData[i].sprites.other['official-artwork'].front_default;
                                allPokemonsFinal.push({ name, types, img })
                                //Declaro variables para el nombre, tipos y foto de cada pokemon y las pusheo a un array vacio
                            }
                            return res.json(allPokemonsFinal)
                        })
                        .catch(err => {
                            res.send(err)
                        });
                })
                .catch(err => {
                    res.send(err)
                });
        })
        .catch(err => {
            res.send(err)
        });
});

router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(resp => {
            let finalDetailed = [];
            let infoRaw = resp.data;
            finalDetailed.push({
                Name: infoRaw.name,
                Types: infoRaw.types.map(t => t.type.name),
                Img: infoRaw.sprites.other['official-artwork'].front_default,
                Hp: infoRaw.stats[0].base_stat,
                Force: infoRaw.stats[1].base_stat,
                Defense: infoRaw.stats[2].base_stat,
                Speed: infoRaw.stats[5].base_stat,
                Id: infoRaw.id,
                Weight: infoRaw.weight,
                Height: infoRaw.height,
            });
            res.send(finalDetailed)
        })
});



module.exports = router;