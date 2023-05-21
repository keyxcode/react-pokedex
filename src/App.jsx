import { useState, useEffect } from "react";
import "./App.css";
import GlobalStyles from "./GlobalStyles";
import PokedexContainer from "./components/PokedexContainer";
import LightsZone from "./components/LightsZone";
import ImageZone from "./components/ImageZone";
import ControlZone from "./components/ControlsZone";
import decamark from "./assets/decamark.png";
import pokemonsService from "./services/pokemons";

const MAX_ID_POKEMON = 1010;
// There are 3 info slides in total
const MAX_SLIDE_INDEX = 2;

function App() {
  const [searchQuery, setSearchQuery] = useState(
    window.localStorage.getItem("searchQuery")
      ? JSON.parse(window.localStorage.getItem("searchQuery"))
      : 1
  );
  const [pokemonData, setPokemonData] = useState("");
  const [specieData, setSpecieData] = useState("");
  const [pkmObject, setPkmObject] = useState({
    sprite: "",
    name: "",
    types: [],
    stats: [],
    description: "",
    genus: "",
    weight: "",
    height: "",
    id: "",
  });
  const [formInput, setFormInput] = useState("");
  const [activeInfoSlide, setActiveInfoSlide] = useState(0);
  const [mainLightActive, setMainLightActive] = useState(false);

  useEffect(() => {
    pokemonsService
      .getPokemon(searchQuery)
      .then((data) => {
        setPokemonData(data);
        window.localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
      })
      .catch((e) => console.log(e.message));

    pokemonsService
      .getSpecie(searchQuery)
      .then((data) => {
        setSpecieData(data);
      })
      .catch((e) => console.log(e.message));
  }, [searchQuery]);

  useEffect(() => {
    if (!pokemonData || !specieData) return;

    setPkmObject((prevState) => ({
      ...prevState,
      sprite:
        pokemonData["sprites"]["other"]["official-artwork"]["front_default"],
      name: pokemonData["name"],
      types: pokemonData["types"].map((slot) => slot["type"]["name"]),
      stats: pokemonData["stats"].map((stat) => ({
        [stat["stat"]["name"]]: stat["base_stat"],
      })),
      weight: pokemonData["weight"],
      height: pokemonData["height"],
    }));

    setPkmObject((prevState) => ({
      ...prevState,
      description: specieData["flavor_text_entries"].filter(
        (entry) => entry["language"]["name"] === "en"
      )[0]["flavor_text"],
      genus: specieData["genera"].filter(
        (g) => g["language"]["name"] === "en"
      )[0]["genus"],
      id: specieData["id"],
    }));
  }, [pokemonData, specieData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formInput === "") return;

    const parsedQuery = parseInt(formInput);

    if (!isNaN(parsedQuery)) {
      // search query is a number
      if (parsedQuery < 0 || parsedQuery > MAX_ID_POKEMON) {
        console.log("invalid id");
      } else {
        setSearchQuery(parsedQuery);
      }
    } else {
      // search query is text based
      setSearchQuery(formInput.toLowerCase());
      console.log("query is a string");
    }

    setFormInput("");
    toggleMainLight();
  };

  const prevPkm = () => {
    setSearchQuery(pkmObject.id - 1);
    toggleMainLight();
  };
  const nextPkm = () => {
    setSearchQuery(pkmObject.id + 1);
    toggleMainLight();
  };

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
          id={pkmObject.id}
          name={pkmObject.name}
        />
        <ControlZone
          handleSubmit={handleSubmit}
          setFormInput={setFormInput}
          formInput={formInput}
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
