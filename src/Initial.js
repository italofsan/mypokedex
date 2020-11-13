import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PokemonList from './PokemonList';
import Pagination from './Pagination';

const Initial = () => {
  const [pokemonName, setPokemonName] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);


  
  useEffect(()=>{
    setLoading(true);
    let cancel;
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(response => {
        setLoading(false);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setPokemonName(response.data.results.map(pokemon => pokemon.name));
      }
    )
    return () => cancel();
  },[currentPageUrl])

  function goNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }

  function goPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  return (
    <div className="App">
      <div style={{display: "flex", justifyContent: "center"}}>
        <h1>My Pokedex</h1>
      </div>

      {loading ? "Loading..." : 
        <div>
          <PokemonList pokemon={pokemonName} />
          <Pagination 
            goNextPage={nextPageUrl ? goNextPage : null} 
            goPrevPage={prevPageUrl ? goPrevPage : null}
          />
        </div> 
      }
    </div>
  );
}

export default Initial;
