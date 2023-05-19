import { useState, useEffect } from "react";
import "./App.css";
import GlobalStyles from "./GlobalStyles";
import PokedexContainer from "./components/PokedexContainer";
import LightsZone from "./components/LightsZone";
import ImageZone from "./components/ImageZone";
import ControlZone from "./components/ControlsContainer";

function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pkmObject, setPkmObject] = useState({
    sprite: "",
    name: "",
    types: [],
    stats: [],
    description: "",
    genus: "",
    weight: "",
    height: "",
  });
  const [searchId, setSearchId] = useState("");
  const [activeInfoSlide, setActiveInfoSlide] = useState(0);
  const [mainLightActive, setMainLightActive] = useState(false);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((data) => {
        setPkmObject((prevState) => ({
          ...prevState,
          sprite: data["sprites"]["other"]["official-artwork"]["front_default"],
          name: data["name"],
          types: data["types"].map((slot) => slot["type"]["name"]),
          stats: data["stats"].map((stat) => ({
            [stat["stat"]["name"]]: stat["base_stat"],
          })),
          weight: data["weight"],
          height: data["height"],
        }));
      });

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .then((response) => response.json())
      .then((data) => {
        setPkmObject((prevState) => ({
          ...prevState,
          description: data["flavor_text_entries"].filter(
            (entry) => entry["language"]["name"] === "en"
          )[0]["flavor_text"],
          genus: data["genera"].filter(
            (g) => g["language"]["name"] === "en"
          )[0]["genus"],
        }));
      });
  }, [pokemonId]);

  useEffect(() => {
    setPokemonId(
      window.localStorage.getItem("pokemonId")
        ? parseInt(JSON.parse(window.localStorage.getItem("pokemonId")))
        : 1
    );
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "pokemonId",
      parseInt(JSON.stringify(pokemonId))
    );
  }, [pokemonId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPokemonId(parseInt(searchId));
    setSearchId("");
    toggleMainLight();
  };

  const prevPkm = () => {
    setPokemonId(pokemonId - 1);
    toggleMainLight();
  };
  const nextPkm = () => {
    setPokemonId(pokemonId + 1);
    toggleMainLight();
  };

  // There are 3 info slides in total
  const MAX_SLIDE_INDEX = 2;

  const infoUp = () => {
    const currentSlide =
      activeInfoSlide - 1 < 0 ? MAX_SLIDE_INDEX : activeInfoSlide - 1;

    setActiveInfoSlide(currentSlide);
  };

  const infoDown = () => {
    const currentSlide =
      activeInfoSlide + 1 > MAX_SLIDE_INDEX ? 0 : activeInfoSlide + 1;

    setActiveInfoSlide(currentSlide);
  };

  const toggleMainLight = () => {
    setMainLightActive(true);
    setTimeout(() => {
      setMainLightActive(false);
    }, 250);
  };

  return (
    <>
      <GlobalStyles />
      <PokedexContainer>
        <LightsZone
          activeInfoSlide={activeInfoSlide}
          mainLightActive={mainLightActive}
        />
        <ImageZone
          sprite={pkmObject.sprite}
          id={pokemonId}
          name={pkmObject.name}
        />
        <ControlZone
          handleSubmit={handleSubmit}
          setSearchId={setSearchId}
          searchId={searchId}
          pkmObject={pkmObject}
          activeInfoSlide={activeInfoSlide}
          prevPkm={prevPkm}
          nextPkm={nextPkm}
          infoUp={infoUp}
          infoDown={infoDown}
        />
      </PokedexContainer>
    </>
  );
}

export default App;
