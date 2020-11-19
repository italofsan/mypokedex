import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export async function fetchPokemon(pokemon){
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
}

export default api;