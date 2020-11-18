// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://pokeapi.co/api/v2/pokemon',
// });

// export default api;

const baseURL = 'https://pokeapi.co/api/v2';

const query = {
  pokemon: 'pokemon',
  type: 'type',
  ability: 'ability'
};

export async function fetchPokemon(pokemon){
  return fetch(`${baseURL}/${query.pokemon}/${pokemon}/`);
}
