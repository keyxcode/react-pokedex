import { useState, useEffect } from "react";
import "./App.css";
import GlobalStyles from "./GlobalStyles";
import PokedexContainer from "./components/PokedexContainer";
import LightsZone from "./components/LightsZone";
import ImageZone from "./components/ImageZone";
import ControlZone from "./components/ControlsZone";

const MAX_ID_POKEMON = 1010;

function App() {
  const [searchQuery, setSearchQuery] = useState(
    window.localStorage.getItem("searchQuery")
      ? JSON.parse(window.localStorage.getItem("searchQuery"))
      : 1
  );
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
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`)
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
        window.localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
      })
      .catch((e) => console.log(e));

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${searchQuery}/`)
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
          id: data["id"],
        }));
      })
      .catch((e) => console.log(e));
  }, [searchQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const parsedQuery = parseInt(formInput);
    if (!isNaN(parsedQuery)) {
      if (parsedQuery < 0 || parsedQuery > MAX_ID_POKEMON) {
        console.log("invalid id");
      } else {
        setSearchQuery(parsedQuery);
      }
    } else {
      setSearchQuery(formInput);
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
