import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonData, setPokemonData] = useState("");
  const [pokemonImg, setPokemonImg] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((data) =>
        setPokemonImg(
          data["sprites"]["other"]["official-artwork"]["front_default"]
        )
      );

    console.log(pokemonImg);

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .then((response) => response.json())
      .then((data) =>
        setPokemonData(data["flavor_text_entries"][0]["flavor_text"])
      )
      .catch((e) => console.log(e));
    setPokemonId(1);
  }, []);

  return (
    <div>
      <div className="pokedex-outline">
        <img src={pokemonImg} />
        <div>{pokemonData}</div>
      </div>
    </div>
  );
}

export default App;
