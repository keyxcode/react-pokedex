import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2";

const getPokemon = async (query) => {
  const response = await axios.get(`${baseUrl}/pokemon/${query}`);
  return response.data;
};

const getSpecie = async (query) => {
  const response = await axios.get(`${baseUrl}/pokemon-species/${query}`);
  return response.data;
};

export default { getPokemon, getSpecie };
