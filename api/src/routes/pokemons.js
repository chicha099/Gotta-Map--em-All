const { Router } = require("express");
const axios = require('axios');
const { Pokemon, Tipo } = require("../db.js");

const router = Router();

router.get("/", (req, res) => {
    const { name } = req.query;
    if (name) {
        Pokemon.findOne({
            where: { Nombre: name },
            include: {
                model: Tipo,
                attributes: ['name']
            }
        })
            .then(respDb => {
                if (respDb) {
                    return res.json(respDb)
                }
            })
            .catch(err => {
                return res.send(err)
            });
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(resp => {
                let finalDetailed = [];
                let infoRaw = resp.data;
                finalDetailed.push({
                    name: infoRaw.name,
                    types: infoRaw.types.map(t => t.type.name),
                    img: infoRaw.sprites.other['official-artwork'].front_default,
                    hp: infoRaw.stats[0].base_stat,
                    force: infoRaw.stats[1].base_stat,
                    defense: infoRaw.stats[2].base_stat,
                    speed: infoRaw.stats[5].base_stat,
                    id: infoRaw.id,
                    weight: infoRaw.weight,
                    height: infoRaw.height,
                });
                return res.send(finalDetailed)
            })
            .catch(err => {
                return res.send(err)
            });
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
                                let force = allPokesData[i].stats[1].base_stat;
                                let id = allPokesData[i].id;
                                let types = allPokesData[i].types.map(t => t.type.name);
                                let img = allPokesData[i].sprites.other['official-artwork'].front_default;
                                allPokemonsFinal.push({ name, types, img, force, id })
                                //Declaro variables para el nombre, tipos y foto de cada pokemon y las pusheo a un array vacio
                                Pokemon.findAll({
                                    include: {
                                        model: Tipo,
                                        attributes: ['name']
                                    }
                                })
                                    .then(respDb => {
                                        let FINAL = allPokemonsFinal.concat(respDb);
                                        return res.json(FINAL)
                                    })
                            }
                        })
                        .catch(err => {
                            return res.send(err)
                        });
                })
                .catch(err => {
                    return res.send(err)
                });
        })
        .catch(err => {
            return res.send(err)
        });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    if (id === '0') {
        return res.json([])
    }

    if (id.length < 10) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(resp => {
                let finalDetailed = [];
                let infoRaw = resp.data;
                finalDetailed.push({
                    name: infoRaw.name,
                    types: infoRaw.types.map(t => t.type.name),
                    img: infoRaw.sprites.other['official-artwork'].front_default,
                    hp: infoRaw.stats[0].base_stat,
                    force: infoRaw.stats[1].base_stat,
                    defense: infoRaw.stats[2].base_stat,
                    speed: infoRaw.stats[5].base_stat,
                    id: infoRaw.id,
                    weight: infoRaw.weight,
                    height: infoRaw.height,
                });
                return res.send(finalDetailed)
            })
            .catch(err => {
                return res.send(err)
            });
    }
    else {
        Pokemon.findOne({
            where: { ID: id },
            include: {
                model: Tipo,
                attributes: ['name']
            }
        })
            .then(resp => {
                return res.json(resp);
            })
            .catch(err => {
                return res.send(err)
            });
    }

});

router.post('/', (req, res) => {
    const {
        Nombre,
        Vida,
        Fuerza,
        Defensa,
        Velocidad,
        Peso,
        Altura,
        Imagen,
        Tipos
    } = req.body;

    Pokemon.create({
        Nombre,
        Vida,
        Fuerza,
        Defensa,
        Velocidad,
        Peso,
        Altura,
        Imagen
    })
        .then(pokemon => {
            pokemon.addTipos(Tipos)
                .then(() => {
                    return res.send("OK")
                });
        });
})

module.exports = router;