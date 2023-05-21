import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2";

const getPokemon = (query) => {
  const request = axios.get(`${baseUrl}/pokemon/${query}`);
  return request.then((response) => response.data);
};

const getSpecie = (query) => {
  const request = axios.get(`${baseUrl}/pokemon-species/${query}`);
  return request.then((response) => response.data);
};

export default { getPokemon, getSpecie };
