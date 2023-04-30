import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemonId, setPokemonId] = useState(1);
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
    const slides = document.querySelectorAll(".info-slide");
    const slidesLength = slides.length;

    for (let i = 0; i < slidesLength; ++i) {
      if (i === activeInfoSlide) slides[i].style.display = "block";
      else {
        slides[i].style.display = "none";
      }
    }
  }, [activeInfoSlide]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPokemonId(parseInt(searchId));
    setSearchId("");
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
  };
  const nextPkm = () => {
    setPokemonId(pokemonId + 1);
  };

  const prevSlide = () => {
    const slides = document.querySelectorAll(".info-slide");
    const currentSlide =
      activeInfoSlide - 1 < 0 ? slides.length - 1 : activeInfoSlide - 1;

    setActiveInfoSlide(currentSlide);
  };

  const nextSlide = () => {
    const slides = document.querySelectorAll(".info-slide");
    const currentSlide =
      activeInfoSlide + 1 >= slides.length ? 0 : activeInfoSlide + 1;

    setActiveInfoSlide(currentSlide);
  };
  return (
    <div>
      <div className="pokedex-outline">
        <div className="lights-zone">
          <div className="light"></div>
          <div className="light"></div>
          <div className="light"></div>
          <div className="light"></div>
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
            <div className="img-decoration">
              <div className="light"></div>
              <div>≡</div>
            </div>
          </div>
        </div>
        <div className="lower-zone">
          <div className="description-zone">
            <div className="info-slide">
              {types.map((type) => (
                <span key={type}>{type} </span>
              ))}
            </div>
            <div className="info-slide">{pkmDescription}</div>
            <div className="info-slide">
              {stats.map((stat) => (
                <div key={JSON.stringify(stat)}>{JSON.stringify(stat)}</div>
              ))}
            </div>
          </div>
          <div className="buttons-zone">
            <button className="prev-button" onClick={prevPkm}>
              ◁
            </button>
            <button className="next-button" onClick={nextPkm}>
              ▷
            </button>
            <button className="down-button" onClick={prevSlide}>
              ▽
            </button>
            <button className="up-button" onClick={nextSlide}>
              △
            </button>
          </div>
          <div className="search-zone">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button>search</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
