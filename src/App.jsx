import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemonId, setPokemonId] = useState(
    window.localStorage.getItem("pokemonId")
      ? parseInt(JSON.parse(window.localStorage.getItem("pokemonId")))
      : 1
  );
  const [pkmDescription, setPkmDescription] = useState("");
  const [pkmInfo, setPkmInfo] = useState("");
  const [searchId, setSearchId] = useState("");
  const [activeInfoSlide, setActiveInfoSlide] = useState(0);

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

  useEffect(() => {
    // there are the same numbers of info slides and info lights : 3
    const slides = document.querySelectorAll(".info-slide");
    const lights = document.querySelectorAll(".info-light");
    const slidesLength = slides.length;

    for (let i = 0; i < slidesLength; ++i) {
      if (i === activeInfoSlide) {
        slides[i].classList.add("show");
        slides[i].classList.remove("hide");
        lights[i].classList.add("active-light");
      } else {
        slides[i].classList.remove("show");
        slides[i].classList.add("hide");
        lights[i].classList.remove("active-light");
      }
    }
  }, [activeInfoSlide]);

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

  const sprite = pkmInfo
    ? pkmInfo["sprites"]["other"]["official-artwork"]["front_default"]
    : "";
  const name = pkmInfo ? pkmInfo["name"] : "";
  const types = pkmInfo
    ? pkmInfo["types"].map((slot) => slot["type"]["name"])
    : [];
  const stats = pkmInfo
    ? pkmInfo["stats"].map((stat) => ({
        [stat["stat"]["name"]]: stat["base_stat"],
      }))
    : [];

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
    const light = document.querySelector(".main-light");
    light.classList.add("active-light");
    setTimeout(() => light.classList.remove("active-light"), 200);
  };

  return (
    <div>
      <div className="pokedex-outline">
        <div className="lights-zone">
          <div className="light main-light"></div>
          <div className="light info-light"></div>
          <div className="light info-light"></div>
          <div className="light info-light"></div>
        </div>
        <div className="img-zone">
          <div className="img-border">
            <div className="img-decoration top">
              <div className="light"></div>
              <div className="light"></div>
            </div>
            <div className="img-container">
              <img src={sprite} />
              <div className="pkm-name">
                #{pokemonId} {name}
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
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button>go</button>
            </form>
          </div>
          <div className="description-zone">
            <div className="info-slide">{pkmDescription}</div>
            <div className="info-slide">
              {types.map((type) => (
                <div key={type}>{type} </div>
              ))}
            </div>
            <div className="info-slide">
              {stats.map((stat) =>
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
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
