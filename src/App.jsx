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
    pokemonsService
      .getPokemon(searchQuery)
      .then((data) => {
        setPokemonData(data);
      })
      .catch((e) => {
        setPkmObject((prevState) => ({
          ...prevState,
          sprite: decamark,
          name: "???",
          types: [],
          weight: "",
          height: "",
        }));
        console.log(e.message);
        toggleErrorLight();
      });

    pokemonsService
      .getSpecie(searchQuery)
      .then((data) => {
        setSpecieData(data);
      })
      .catch((e) => {
        setPkmObject((prevState) => ({
          ...prevState,
          description: "???",
          genus: "???",
        }));
        console.log(e.message);
        toggleErrorLight();
      });

    window.localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    if (pokemonData) {
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

      setPkmObject((prevState) => ({
        ...prevState,
        sprite,
        name,
        types,
        stats,
        weight,
        height,
      }));
    }

    if (specieData) {
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

      setPkmObject((prevState) => ({
        ...prevState,
        description,
        genus,
      }));
    }
  }, [pokemonData, specieData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formInput === "") return toggleErrorLight();

    const parsedQuery = parseInt(formInput);

    if (!isNaN(parsedQuery)) {
      if (parsedQuery < 1 || parsedQuery > MAX_ID_POKEMON) {
        return toggleErrorLight();
      }
      setSearchQuery(parsedQuery);
    } else {
      const textQuery = formInput.toLowerCase();

      pokemonsService
        .getPokemon(textQuery)
        .then((data) => {
          setSearchQuery(data["id"]);
          toggleMainLight();
        })
        .catch((e) => {
          console.log(e);
          pokemonsService
            .getSpecie(textQuery)
            .then((data) => {
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
