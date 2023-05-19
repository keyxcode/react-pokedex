import { useState, useEffect } from "react";
import "./App.css";
import GlobalStyles from "./GlobalStyles";
import Light from "./components/Light";
import LightsZone from "./components/LightsZone";
import ImageZone from "./components/ImageZone";
import SearchForm from "./components/SearchForm";
import InfoSlides from "./components/InfoSlides";

function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pkmObject, setPkmObject] = useState({
    sprite: "",
    name: "",
    types: [],
    stats: [],
    description: "",
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
        }));
      });

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .then((response) => response.json())
      .then((data) => {
        setPkmObject((prevState) => ({
          ...prevState,
          description: data["flavor_text_entries"][0]["flavor_text"],
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
      <div className="pokedex-outline">
        <LightsZone
          activeInfoSlide={activeInfoSlide}
          mainLightActive={mainLightActive}
        />
        <ImageZone
          sprite={pkmObject.sprite}
          id={pokemonId}
          name={pkmObject.name}
        />
        <div className="lower-zone">
          <SearchForm
            handleSubmit={handleSubmit}
            setSearchId={setSearchId}
            searchId={searchId}
          />
          <InfoSlides pkmObject={pkmObject} activeInfoSlide={activeInfoSlide} />
          <div className="buttons-zone">
            <button className="prev-button" onClick={prevPkm}>
              ◁
            </button>
            <button className="next-button" onClick={nextPkm}>
              ▷
            </button>
            <button className="down-button" onClick={infoDown}>
              ▽
            </button>
            <button className="up-button" onClick={infoUp}>
              △
            </button>
            <div className="color-strip row"></div>
            <div className="color-strip col"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
