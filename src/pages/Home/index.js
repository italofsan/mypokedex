import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import axios from 'axios';

import HeaderPokedex from '../../components/HeaderPokedex';
import PokemonList from '../../components/List';
import Pagination from '../../components/Pagination';
import PokemonCard from '../../components/PokemonCard';
import PokemonSearch from '../../components/PokemonSearch';

import { fetchPokemon, fetchPokemonByType } from '../../services/api';

const Home = () => {
  const classes = useStyles(); 
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [pokemonsByType, setPokemonsByType] = useState();
  
  const [loading2, setLoading2] = useState(false);
  const [pokemonListNames, setPokemonListNames] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    setLoading2(true);
    const fetchAllPokemon = async () => {
       await axios.get(currentPageUrl)
        .then((response) => {
          setLoading2(false);
          setNextPageUrl(response.data.next);
          setPrevPageUrl(response.data.previous);
          setPokemonListNames(response.data.results.map((pokemon) => pokemon.name));
    })}
    fetchAllPokemon();
    renderList();
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

  const renderList = () => {

    return(
      <div>
        <PokemonList pokemonListNames={pokemonListNames} getPokemon={getPokemon} offset={offset}/>
        <Pagination
          goNextPage={nextPageUrl ? goNextPage : null}
          goPrevPage={prevPageUrl ? goPrevPage : null}
        />
      </div>
    )
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

  // if (loading) {
  //   return (
  //     <>
  //     <div style={{ display: 'flex', justifyContent: 'center'}}>
  //     <Container maxWidth="lg">
  //       <div style={{ display: 'flex', justifyContent: 'center', margin: 20}}>
  //         <Typography variant="h1" className={classes.title}>My Pokedex</Typography>
  //       </div>

        

  //       <div style={{display: 'flex', justifyContent: 'center'}}>
  //         <PokemonSearch 
  //           getPokemon={getPokemon} 
  //           // getPokemonByType={getPokemonByType}
  //         />
  //       </div>
        
  //       <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>loading...</div>
  //       </Container>
  //       </div>
  //     </>
  //   );
  // }

	
  return(
    <div >
      <Container maxWidth="lg">
        <div className={classes.divTitle}>
          <Typography variant="h1" className={classes.title}>My Pokedex</Typography>
        </div>

        <div className={classes.divSearch}>
          <PokemonSearch 
            getPokemon={getPokemon} 
            // getPokemonByType={getPokemonByType}
          />
        </div>   

        <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
          {!loading && pokemon ? (
            
            <div style={{display: 'flex', justifyContent: "center"}}>
              {console.log(pokemon)}            
              <PokemonCard 
                pokeName={pokemon.name} 
                pokeId={() => formatId(pokemon.id.toString())} 
                pokeImage={pokemon.sprites.other["official-artwork"].front_default}
                pokeTypes={pokemon.types}
                pokeStats={pokemon.stats}
                pokeAbilities={pokemon.abilities}
                pokeMoves={pokemon.moves}
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
          null
          ) : (
            <div>
              <PokemonList pokemonListNames={pokemonListNames} getPokemon={getPokemon} offset={offset}/>
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
  divTitle: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20
  },
  divSearch: {
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    fontSize: 72
  }
});

export default withRouter(Home);
