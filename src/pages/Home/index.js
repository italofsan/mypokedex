import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import axios from 'axios';

import PokemonList from '../../components/List';
import Pagination from '../../components/Pagination';
import PokemonCard from '../../components/PokemonCard';
import PokemonSearch from '../../components/PokemonSearch';

import { fetchPokemon } from '../../services/api';

const Home = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [pokemonListNamesByType, setPokemonListNamesByType] = useState([]);

  const [loading2, setLoading2] = useState(false);
  const [pokemonListNames, setPokemonListNames] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [offset, setOffset] = useState(1);

  const [visibleCard, setVisibleCard] = useState("flex");
  const [visibleListAll, setVisibleListAll] = useState("flex");
  const [visibleListType, setVisibleListType] = useState("flex");

  useEffect(() => {
    setLoading2(true);
    const fetchAllPokemon = async () => {
      await axios.get(currentPageUrl).then((response) => {
        setLoading2(false);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setPokemonListNames(
          response.data.results.map((pokemon) => pokemon.name)
        );
      });
    };
    fetchAllPokemon();
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
    setVisibleCard("flex");
    setVisibleListAll("none");
    setVisibleListType("none");
    setLoading(true);
    const response = await fetchPokemon(query);
    const results = await response.json();
    setPokemon(results);
    setLoading(false);
  };

  const [test, setTest] = useState([]);

  const fetchAllPokemonByType = async (type) => {
    setVisibleCard("none");
    setVisibleListAll("none");
    setVisibleListType("flex");
    await axios
      .get(`https://pokeapi.co/api/v2/type/${type}/`)
      .then((response) => {
        // console.log(
        //   response.data.pokemon.map((pokemon) => pokemon.pokemon.name)
        // );
        setPokemonListNamesByType(
          response.data.pokemon.map((pokemon) => pokemon.pokemon.name)
        );
        // response.data.pokemon.map( async (pokemon) => {
        //   await axios.get(pokemon.pokemon.url)
        //   .then((response) => {
        //     // console.log(response.data.name)
        //     setTest([...test, response.data.name])
        //   })
        // })
        
      });
    // console.log(pokemonListNamesByType);
    // console.log(test);
  };

  // Função que formata o ID do Pokemon para um número de três algarismos
  const formatId = (id) => {
    if (id.length === 1) {
      return '00' + id;
    } else if (id.length === 2) {
      return '0' + id;
    } else {
      return id;
    }
  };

  // Mostrado quando está sendo realizada alguma requisição
  if (loading) {
    return (
      <Container maxWidth='lg'>
        <div className={classes.divTitle}>
          <Typography variant='h1' className={classes.title}>
            My Pokedex
          </Typography>
        </div>

        <div className={classes.divSearch}>
          <PokemonSearch
            getPokemon={getPokemon}
            fetchAllPokemonByType={fetchAllPokemonByType}
          />
        </div>
        
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <div className={classes.loading} style={{display: 'flex'}}>
            <img src="https://camo.githubusercontent.com/9be29021cfdb21b2cc257a3efcb269f64d42f5b6/687474703a2f2f32352e6d656469612e74756d626c722e636f6d2f63393961353739646233616530666331363462663463636131343838383564332f74756d626c725f6d6a6776386b45754d67317338376e37396f315f3430302e676966" alt="Loading" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <Container maxWidth='lg'>
        <div className={classes.divTitle}>
          <Typography variant='h1' className={classes.title}>
            My Pokedex
          </Typography>
        </div>

        <div className={classes.divSearch}>
          <PokemonSearch
            getPokemon={getPokemon}
            fetchAllPokemonByType={fetchAllPokemonByType}
          />
        </div>

        {/* Div que mostra Pokemon pesquisado por Nome ou ID */}
        <div
          style={{ marginTop: 20, display: "flex", justifyContent: 'center' }}
        >
          {!loading && pokemon ? (
            <div style={{ display: `${visibleCard}`, justifyContent: 'center' }}>
              {console.log(pokemon)}
              <PokemonCard
                pokeName={pokemon.name}
                pokeId={() => formatId(pokemon.id.toString())}
                pokeImage={
                  pokemon.sprites.other['official-artwork'].front_default
                }
                pokeTypes={pokemon.types}
                pokeStats={pokemon.stats}
                pokeAbilities={pokemon.abilities}
                pokeMoves={pokemon.moves}
              />
            </div>
          ) : null}
        </div>

        {/* Div que mostra Pokemons pesquisados por tipo */}
        <div
          style={{ marginTop: 20, display: 'flex', justifyContent: 'center', verticalAlign: 'middle' }}
        >
          {!loading && pokemonListNamesByType ? (
            <div style={{ display: `${visibleListType}`, justifyContent: 'center' }}>
            {/* {console.log(test)} */}
            <PokemonList
              pokemonListNames={pokemonListNamesByType}
              getPokemon={getPokemon}
              offset={offset}
            />
            </div>
          ) : null}
        </div>

        {/* Div que mostra a lista de todos os Pokemons */}
        <div  style={{ display: `${visibleListAll}`, justifyContent: 'center' }}>
          {!loading2 ? (
            <div> 
              <PokemonList
                pokemonListNames={pokemonListNames}
                getPokemon={getPokemon}
                offset={offset}
              />
              <Pagination
                goNextPage={nextPageUrl ? goNextPage : null}
                goPrevPage={prevPageUrl ? goPrevPage : null}
              />
            </div>
          ) : null }
        </div>
      </Container>
    </div>
  );
};

const useStyles = makeStyles({
  divTitle: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
  },
  divSearch: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: 72,
  },
  loading: {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 50,
  }
});

export default withRouter(Home);
