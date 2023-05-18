import { useState, useEffect } from "react";
import "./App.css";
import { createGlobalStyle } from "styled-components";
import Light from "./components/Light";
import LightsZone from "./components/LightsZone";

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
    mainLight();
  };

  const prevPkm = () => {
    setPokemonId(pokemonId - 1);
    mainLight();
  };
  const nextPkm = () => {
    setPokemonId(pokemonId + 1);
    mainLight();
  };

  const infoUp = () => {
    const slides = document.querySelectorAll(".info-slide");
    const currentSlide =
      activeInfoSlide - 1 < 0 ? slides.length - 1 : activeInfoSlide - 1;

    setActiveInfoSlide(currentSlide);
  };

  const infoDown = () => {
    const slides = document.querySelectorAll(".info-slide");
    const currentSlide =
      activeInfoSlide + 1 >= slides.length ? 0 : activeInfoSlide + 1;

    setActiveInfoSlide(currentSlide);
  };

  const mainLight = () => {
    setMainLightActive(true);
    setTimeout(() => {
      setMainLightActive(false);
    }, 250);
  };

  const GlobalStyles = createGlobalStyle`
  * {
  box-sizing: border-box;
  font-family: "Silkscreen", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;

  --red: #d3242b;
  --dark-red: #ac2933;
  --light-red: #ee1825;
  --green: #00a851;
  --yellow: #fef503;
  --blue: #01aeec;
  --black: #1a1619;
  --dark-gray: #58585a;
  --light-gray: #f2f3f3;

  --xxs: 1px;
  --xs: 4px;
  --s: 8px;
  --md: 16px;
  --l: 24px;
  --xxl: 48px;
}
`;

  return (
    <>
      <GlobalStyles />
      <div className="pokedex-outline">
        <LightsZone
          activeInfoSlide={activeInfoSlide}
          mainLightActive={mainLightActive}
        />
        <div className="img-zone">
          <div className="img-border">
            <div className="img-decoration top">
              <div className="light"></div>
              <div className="light"></div>
            </div>
            <div className="img-container">
              <img src={pkmObject.sprite} />
              <div className="pkm-name">
                #{pokemonId} {pkmObject.name}
              </div>
            </div>
            <div className="img-decoration bottom">
              <div className="light"></div>
              <div>≡</div>
            </div>
          </div>
        </div>
        <div className="lower-zone">
          <div className="search-zone">
            <form onSubmit={handleSubmit}>
              <button>search</button>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </form>
          </div>
          <div className="description-zone">
            <div className="info-slide">{pkmObject.description}</div>
            <div className="info-slide">
              {pkmObject.types.map((type) => (
                <div key={type}>{type} </div>
              ))}
            </div>
            <div className="info-slide">
              {pkmObject.stats.map((stat) =>
                // <div key={JSON.stringify(stat)}>{JSON.stringify(stat)}</div>
                Object.entries(stat).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value}
                  </div>
                ))
              )}
            </div>
          </div>
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
