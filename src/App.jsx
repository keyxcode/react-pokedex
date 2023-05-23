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
const MAX_SLIDE_INDEX = 2;

function App() {
  const [searchQuery, setSearchQuery] = useState(
    window.localStorage.getItem("searchQuery")
      ? JSON.parse(window.localStorage.getItem("searchQuery"))
      : 1
  );
  console.log(`Re-rendered with query ${searchQuery}`);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState("");
  const [pkmObject, setPkmObject] = useState({
    sprite: "",
    name: "",
    types: [],
    stats: [],
    weight: "",
    height: "",
    description: "",
    genus: "",
  });
  const [formInput, setFormInput] = useState("");
  const [activeInfoSlide, setActiveInfoSlide] = useState(0);
  const [mainLightActive, setMainLightActive] = useState(false);
  const [errorLightActive, setErrorLightActive] = useState(false);

  useEffect(() => {
    console.log(`calling api with id ${searchQuery}`);
    setIsLoading(true);

    const getData = async () => {
      let data = {};

      try {
        const pokemonData = await pokemonsService.getPokemon(searchQuery);
        data = { ...data, ...pokemonData };
        console.log("...getPokemon succeeded");
      } catch (e) {
        console.log("...getPokemon failed", e.message);
        toggleErrorLight();
      }

      try {
        const specieData = await pokemonsService.getSpecie(searchQuery);
        data = { ...data, ...specieData };
        console.log("...getSpecie succeeded");
      } catch (e) {
        console.log("...getSpecie failed", e.message);
        toggleErrorLight();
      }

      console.log("POKEMON DATA", data);
      setPokemonData(data);
    };

    getData();

    window.localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    console.log("setting pokemonData");

    let newPokemonObj = {
      sprite: "",
      name: "",
      types: [],
      stats: [],
      weight: "",
      height: "",
      description: "",
      genus: "",
    };

    if (pokemonData) {
      console.log("...actually setting pokemonData");

      const sprite = pokemonData["sprites"]
        ? pokemonData["sprites"]["other"]["official-artwork"]["front_default"]
        : decamark;
      const name = pokemonData["name"] ? pokemonData["name"] : "???";
      const types = pokemonData["types"]
        ? pokemonData["types"].map((type) => type["type"]["name"])
        : [];
      const stats = pokemonData["stats"]
        ? pokemonData["stats"].map((stat) => ({
            [stat["stat"]["name"]]: stat["base_stat"],
          }))
        : [];
      const weight = pokemonData["weight"] ? pokemonData["weight"] : "???";
      const height = pokemonData["height"] ? pokemonData["height"] : "???";

      const description =
        pokemonData["flavor_text_entries"] &&
        pokemonData["flavor_text_entries"].filter(
          (entry) => entry["language"]["name"] === "en"
        ).length > 0
          ? pokemonData["flavor_text_entries"].filter(
              (entry) => entry["language"]["name"] === "en"
            )[0]["flavor_text"]
          : "???";
      const genus =
        pokemonData["genera"] &&
        pokemonData["genera"].filter((g) => g["language"]["name"] === "en")
          .length > 0
          ? pokemonData["genera"].filter(
              (g) => g["language"]["name"] === "en"
            )[0]["genus"]
          : "???";

      newPokemonObj = {
        ...newPokemonObj,
        sprite,
        name,
        types,
        stats,
        weight,
        height,
        description,
        genus,
      };
    }

    console.log("...creating new pkm obj");
    setPkmObject(newPokemonObj);
    setIsLoading(false);
  }, [pokemonData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formInput === "") return toggleErrorLight();

    setIsLoading(true);
    const parsedQuery = parseInt(formInput);

    if (!isNaN(parsedQuery)) {
      if (parsedQuery < 1 || parsedQuery > MAX_ID_POKEMON) {
        setFormInput("");
        return toggleErrorLight();
      }
      console.log("searching number query");
      setSearchQuery(parsedQuery);
    } else {
      console.log("parsing text query");
      const textQuery = formInput.toLowerCase();

      try {
        const data = await pokemonsService.getPokemon(textQuery);
        setSearchQuery(data["id"]);
        toggleMainLight();
        console.log("found id through getPokemon route");
      } catch (e) {
        console.log(e.message);

        try {
          const data = await pokemonsService.getSpecie(textQuery);
          setSearchQuery(data["id"]);
          toggleMainLight();
          console.log("found id through getSpecie route");
        } catch (e) {
          setIsLoading(false);
          toggleErrorLight();
          console.log(e.message);
        }
      }
    }

    setFormInput("");
  };

  const prevPkm = () => {
    if (searchQuery === 1) {
      toggleErrorLight();
      return;
    }
    setSearchQuery((prevState) => prevState - 1);
    toggleMainLight();
  };
  const nextPkm = () => {
    if (searchQuery === MAX_ID_POKEMON) return toggleErrorLight();
    setSearchQuery((prevState) => prevState + 1);
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
    }, 300);
  };

  const toggleErrorLight = () => {
    setErrorLightActive(true);
    setTimeout(() => {
      setErrorLightActive(false);
    }, 1000);
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
          id={searchQuery}
          name={pkmObject.name}
          errorLightActive={errorLightActive}
          isLoading={isLoading}
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
