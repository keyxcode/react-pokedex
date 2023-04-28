import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pkmDescription, setPkmDescription] = useState("");
  const [pkmInfo, setPkmInfo] = useState("");
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((data) => setPkmInfo(data));

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .then((response) => response.json())
      .then((data) =>
        setPkmDescription(data["flavor_text_entries"][0]["flavor_text"])
      );
  }, [pokemonId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPokemonId(searchId);
    setSearchId("");
  };

  const sprite = pkmInfo
    ? pkmInfo["sprites"]["other"]["official-artwork"]["front_default"]
    : "";
  const name = pkmInfo ? pkmInfo["name"] : "";

  return (
    <div>
      <div className="pokedex-outline">
        <img src={sprite} />
        <div>
          #{pokemonId} {name}
        </div>
        <div>{pkmDescription}</div>
      </div>
      <button onClick={() => setPokemonId(pokemonId - 1)}>Prev</button>
      <button onClick={() => setPokemonId(pokemonId + 1)}>Next</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button>Search</button>
      </form>
    </div>
  );
}

export default App;
