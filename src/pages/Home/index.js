import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import Details from '../Details'

import PokemonList from '../../components/List';
import Pagination from '../../components/Pagination';
import PokemonSearch from '../../components/PokemonSearch';
import PokemonCard from '../../components/PokemonCard';

import { fetchPokemon, fetchPokemonByType } from '../../services/api';

const Home = () => {
  const classes = useStyles(); 
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [pokemonsByType, setPokemonsByType] = useState();
  

  // const [pokemonAll, setPokemonAll] = useState();
  const [loading2, setLoading2] = useState(false);
  const [pokemonName, setPokemonName] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    setLoading2(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((response) => {
        setLoading2(false);
        console.log(response.data);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setPokemonName(response.data.results.map((pokemon) => pokemon.name));
      });
    return () => cancel();
  }, [currentPageUrl]);

  function goNextPage() {
    setCurrentPageUrl(nextPageUrl);
    setOffset(offset + 20);
  }

  function goPrevPage() {
    setCurrentPageUrl(prevPageUrl);
    setOffset(offset - 20);
  }


  const getPokemon = async (query) => {
    setLoading(true);
    const response = await fetchPokemon(query);
    const results = await response.json();
    setPokemon(results);
    setLoading(false);
  }

  // const getPokemonByType = async (query) => {
  //   setLoading1(true);
  //   const response = await fetchPokemonByType(query);
  //   const results = await response.json();
  //   setPokemonsByType(results.pokemon);
  //   setLoading1(false);
  //   console.log(pokemonsByType)
  // }

  if (loading) {
    return (
      <>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Container maxWidth="lg">
        <div style={{ display: 'flex', justifyContent: 'center', margin: 20}}>
          <h1 variant="h1" className={classes.title}>My Pokedex</h1>
        </div>

        

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <PokemonSearch 
            getPokemon={getPokemon} 
            // getPokemonByType={getPokemonByType}
          />
        </div>
        
        <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>loading...</div>
        </Container>
        </div>
      </>
    );
  }

  const formatId = (id) => {
		if (id.length === 1) {
			return "00" + id;
		} else if (id.length === 2) {
			return "0" + id;
		} else {
      return id;
    }
  }
	
  return(
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Container maxWidth="lg">
        <div style={{ display: 'flex', justifyContent: 'center', margin: 20}}>
          <h1 variant="h1" className={classes.title}>My Pokedex</h1>
        </div>

        

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <PokemonSearch 
            getPokemon={getPokemon} 
            // getPokemonByType={getPokemonByType}
          />
        </div>

        

        <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
          {!loading && pokemon ? (
            <div style={{display: 'flex', justifyContent: "center"}}>            
              <PokemonCard 
                name={pokemon.name} 
                id={() => formatId(pokemon.id.toString())} 
                image={pokemon.sprites.other["official-artwork"].front_default}
                types={pokemon.types}
                stats={pokemon.stats}
                abilities={pokemon.abilities}
                moves={pokemon.moves}
              />
            </div>
          ) : null}
        </div>
        


        {/* {!loading && pokemonsByType ? (
          pokemonsByType.pokemon.map((pokemon, index) => {
            console.log(pokemonsByType.pokemon.pokemon["name"]);
            // <PokemonCard key={index} name={pokemon.name} id={pokemon.id} image={pokemon.sprites.other["official-artwork"].front_default}/>
          }
            
            )
        ) : null} */}

        {loading2 ? (
          <h1>Loading...</h1>
          ) : (
            <div>
              <PokemonList pokemonName={pokemonName} getPokemon={getPokemon} offset={offset}/>
              <Pagination
                goNextPage={nextPageUrl ? goNextPage : null}
                goPrevPage={prevPageUrl ? goPrevPage : null}
              />
          </div>
        )}
        </Container> 
    </div> 
  );
};

const useStyles = makeStyles({
  title: {
    color: '#FFF',
    fontSize: 72
  }
});

export default Home;
