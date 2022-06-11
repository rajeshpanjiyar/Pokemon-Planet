import React, { useState } from "react";
import Axios from "axios";

export default function Body() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    ).then((response) => {
      setPokemon({
        name: pokemonName,
        species: response.data.species.name,
        img: response.data.sprites.other.dream_world.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
        height: response.data.height,
        weight: response.data.weight,

      });
      setPokemonChosen(true);
    });
  };

  return (
    <>
      <div className="container">
        <input
          className="name"
          type="text"
          name="name"
          placeholder="Example: charmander, weedle, kakuna, venusaur, squirtle, bulbasaur, pidgey, rattata, ..............."
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button className="container" onClick={searchPokemon}>
          Search
        </button>
      </div>
      <div className="container">
        <div className="displaySection">
          {!pokemonChosen ? (
            <h2 className="card container">Please choose a Pokemon</h2>
          ) : (
            <>
              <div className="container card">
                <h1 className="pokemon-name">{pokemon.name}</h1>
                <img
                  src={pokemon.img}
                  className="image"
                  alt="This is a Pokemon"
                />
            
                <table id="details">
                  <tr>
                    <th>#</th>
                    <th>Details</th>
                  </tr>
                  <tr>
                    <td>Species</td>
                    <td>{pokemon.species}</td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>{pokemon.type}</td>
                  </tr>
                  <tr>
                    <td>HP</td>
                    <td>{pokemon.hp}</td>
                  </tr>
                  <tr>
                    <td>Defense</td>
                    <td>{pokemon.defense}</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{pokemon.weight}</td>
                  </tr>
                  <tr>
                    <td>Height</td>
                    <td>{pokemon.height}</td>
                  </tr>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
