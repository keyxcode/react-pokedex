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
  console.log(`query ${searchQuery} initialized`);
  const [pokemonData, setPokemonData] = useState("");
  const [specieData, setSpecieData] = useState("");
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
    console.log(`call api with id ${searchQuery}`);

    const getData = async () => {
      let data = {};

      try {
        const pokemonData = await pokemonsService.getPokemon(searchQuery);
        data = { ...data, pokemonData };
        console.log(data);
        console.log("...getPokemon succeeded");
      } catch (e) {
        const pokemonData = {
          sprite: decamark,
          name: "???",
          types: [],
          weight: "???",
          height: "???",
        };
        data = {
          ...data,
          pokemonData,
        };
        console.log("...getPokemon failed", e.message);
        toggleErrorLight();
      }

      try {
        const specieData = await pokemonsService.getSpecie(searchQuery);
        data = { ...data, specieData };
        console.log("...getSpecie succeeded");
      } catch (e) {
        const specieData = {
          description: e.message,
          genus: "???",
        };
        data = {
          ...data,
          specieData,
        };
        console.log("getSpecie failed", e.message);
        toggleErrorLight();
      }

      console.log("POKEMON DATA", data.pokemonData);
      console.log("SPECIE DATA", data.specieData);
      setPokemonData(data.pokemonData);
      setSpecieData(data.specieData);
    };

    getData();

    // pokemonsService
    //   .getPokemon(searchQuery)
    //   .then((data) => {
    //     console.log("...getPokemon succeeded");
    //   })
    //   .catch((e) => {
    //     setPkmObject((prevState) => ({
    //       ...prevState,
    //       sprite: decamark,
    //       name: "???",
    //       types: [],
    //       weight: "???",
    //       height: "???",
    //     }));
    //     console.log(e.message);
    //     toggleErrorLight();
    //   });

    // pokemonsService
    //   .getSpecie(searchQuery)
    //   .then((data) => {
    //     console.log("...getSpecie succeeded");
    //   })
    //   .catch((e) => {
    //     setPkmObject((prevState) => ({
    //       ...prevState,
    //       description: e.message,
    //       genus: "???",
    //     }));
    //     console.log(e.message);
    //     toggleErrorLight();
    //   });

    // setPokemonData(pokemonData);
    // setSpecieData(specieData);

    window.localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    console.log("setting pokemonData");

    let newPokemonObj = { ...pkmObject };

    if (pokemonData) {
      console.log("...set pokemonData");
      const sprite = pokemonData["sprites"]["other"]["official-artwork"][
        "front_default"
      ]
        ? pokemonData["sprites"]["other"]["official-artwork"]["front_default"]
        : "";
      const name = pokemonData["name"] ? pokemonData["name"] : "???";
      const types = pokemonData["types"]
        ? pokemonData["types"].map((type) => type["type"]["name"])
        : [];
      const stats = pokemonData["stats"]
        ? pokemonData["stats"].map((stat) => ({
            [stat["stat"]["name"]]: stat["base_stat"],
          }))
        : [];
      const weight = pokemonData["weight"] ? pokemonData["weight"] : "";
      const height = pokemonData["height"] ? pokemonData["height"] : "";

      newPokemonObj = {
        ...newPokemonObj,
        sprite,
        name,
        types,
        stats,
        weight,
        height,
      };
    }

    console.log("setting specieData");
    if (specieData) {
      console.log("...set specieData");
      const description =
        specieData["flavor_text_entries"].filter(
          (entry) => entry["language"]["name"] === "en"
        ).length > 0
          ? specieData["flavor_text_entries"].filter(
              (entry) => entry["language"]["name"] === "en"
            )[0]["flavor_text"]
          : "???";
      const genus =
        specieData["genera"].filter((g) => g["language"]["name"] === "en")
          .length > 0
          ? specieData["genera"].filter(
              (g) => g["language"]["name"] === "en"
            )[0]["genus"]
          : "???";

      newPokemonObj = {
        ...newPokemonObj,
        description,
        genus,
      };
    }

    console.log("set new pkm obj");
    setPkmObject(newPokemonObj);
  }, [pokemonData, specieData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formInput === "") return toggleErrorLight();

    const parsedQuery = parseInt(formInput);

    if (!isNaN(parsedQuery)) {
      if (parsedQuery < 1 || parsedQuery > MAX_ID_POKEMON) {
        return toggleErrorLight();
      }
      console.log("searching number query");
      setSearchQuery(parsedQuery);
    } else {
      console.log("parsing text query");
      const textQuery = formInput.toLowerCase();

      pokemonsService
        .getPokemon(textQuery)
        .then((data) => {
          console.log("found id through getPokemon route");
          toggleMainLight();
          setSearchQuery(data["id"]);
        })
        .catch((e) => {
          console.log(e);
          pokemonsService
            .getSpecie(textQuery)
            .then((data) => {
              console.log("found id through getSpecie route");
              toggleMainLight();
              setSearchQuery(data["id"]);
            })
            .catch((e) => {
              console.log(e.message);
              toggleErrorLight();
            });
        });
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
